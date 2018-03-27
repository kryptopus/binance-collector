/* @flow */
import AbstractCommand from "solfegejs-cli/lib/Command/AbstractCommand"
import type CollectorService from "../service/CollectorService"

/**
 * Collect pair interval in specific period
 */
export default class CollectPairIntervalInPeriodCommand extends AbstractCommand
{
    /**
     * Collector service
     */
    collector:CollectorService;

    /**
     * Constructor
     *
     * @param   CollectorService    collector   Collector service
     */
    constructor(collector:CollectorService)
    {
        super();

        this.collector = collector;
    }

    /**
     * Configure the command
     */
    async configure()
    {
        this.setName("kryptopus:binance:collect_pair_interval_in_period");
        this.setDescription("Collect pair interval in specific period");
    }

    /**
     * Execute the command
     */
    async execute(parameters:Array<string>)
    {
        const baseAsset:string = parameters.shift();
        const quoteAsset:string = parameters.shift();
        const interval:string = parameters.shift();
        const startDateString:string = parameters.shift();
        const endDateString:string = parameters.shift();

        const startAt:Date = new Date(startDateString);
        const endAt:Date = new Date(endDateString);

        console.log("Collect", baseAsset, quoteAsset, "Interval", interval, "Period", startAt, endAt);
        await this.collector.collectPairIntervalInPeriod(baseAsset, quoteAsset, interval, startAt, endAt);
    }
}
