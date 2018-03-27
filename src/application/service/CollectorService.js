/* @flow */
import type CandleSaver from "../../domain/service/CandleSaver"


/**
 * Main collector service
 */
export default class CollectorService
{
    /**
     * Candle saver
     */
    candleSaver:CandleSaver;

    /**
     * Constructor
     *
     * @param   {CandleSaver}   candleSaver     Candle saver service
     */
    constructor(candleSaver:CandleSaver)
    {
        this.candleSaver = candleSaver;
    }


    /**
     * Collect pair interval in specific period
     *
     * @param   {string}    baseAsset   Base asset
     * @param   {string}    quoteAsset  Quote asset
     * @param   {string}    interval    Interval
     * @param   {Date}      startAt     Start date of the period
     * @param   {Date}      endAt       End date of the period
     */
    async collectPairIntervalInPeriod(baseAsset:string, quoteAsset:string, interval:string, startAt:Date, endAt:Date):void | Promise<void>
    {
    }
}
