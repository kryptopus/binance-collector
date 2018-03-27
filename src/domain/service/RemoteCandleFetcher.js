/* @flow */
import {bind} from "decko"
import binance from "binance"
import Candlestick from "kryptopus-candlestick"

/**
 * Fetch remote candles from binance API
 */
export default class RemoteCandleFetcher
{
    /**
     * REST instance
     */
    rest:any;

    /**
     * Constructor
     */
    constructor()
    {
        this.rest = new binance.BinanceRest();
    }

    /**
     *
     */
    @bind
    async fetchIntervalInPeriod(baseAsset:string, quoteAsset:string, interval:string, startAt:Date, endAt:Date):Promise<Candlestick>
    {
        const symbol:string = `${baseAsset}${quoteAsset}`;
        const startTime = startAt.valueOf();
        const endTime = endAt.valueOf();

        const remoteCandles = await this.rest.klines({
            symbol: symbol,
            interval: interval,
            startTime: startTime,
            endTime: endTime
        });

        let candles = [];
        for (let remoteCandle of remoteCandles) {
            let candle = this.buildCandleFromRemoteCandle(remoteCandle);
            candles.push(candle);
        }

        return candles;
    }

    /**
     * Build candle instance from remonte candle
     *
     * Example:
     * {
     *     openTime: 1513802580000,
     *     open: '0.04837200',
     *     high: '0.04859200',
     *     low: '0.04837000',
     *     close: '0.04837100',
     *     volume: '181.69100000',
     *     closeTime: 1513802639999,
     *     quoteAssetVolume: '8.79608770',
     *     trades: 249,
     *     takerBaseAssetVolume: '75.74200000',
     *     takerQuoteAssetVolume: '3.67104146',
     *     ignored: '0'
     * }
     *
     * @param   {object}        remoteCandle    Remote candle
     * @return  {Candlestick}                   Candle instance
     */
    @bind
    buildCandleFromRemoteCandle(remoteCandle:any):Candlestick
    {
        let candle = new Candlestick();
        candle.openTime = remoteCandle.openTime;
        candle.closeTime = remoteCandle.closeTime;
        candle.open = Number(remoteCandle.open);
        candle.close = Number(remoteCandle.close);
        candle.low = Number(remoteCandle.low);
        candle.high = Number(remoteCandle.high);
        candle.volume = Number(remoteCandle.volume);
        candle.tradeCount = Number(remoteCandle.trades);

        return candle;
    }
}
