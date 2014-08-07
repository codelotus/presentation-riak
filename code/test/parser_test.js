'use strict';

var parser = require('../lib/parser/index.js');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports['parser'] = {

    'setUp': function(callback) {
        this.jsonObj = require('./sample_data');
        this.titles = ['Date','Number of Shares Outstanding','3-Year Regression Beta','3-year Standard Deviation of Stock Price','Book Debt to Capital Ratio','Book Value of Equity','Book Value of Assets','Capital Expenditures','Cash','Cash as Percentage of Firm Value','Cash as Percentage of Revenues','Cash as Percentage of Total Assets','Change in Non-Cash Working Capital','Correlation with the Market','Current PE Ratio','Depreciation','Dividend Yield','Dividends','Earnings Before Interest and Taxes','EBIT for Previous Period','Earnings Before Interest Taxes Depreciation and Amortization','Effective Tax Rate','Effective Tax Rate on Income','Enterprise Value','EV to Invested Capital Ratio','EV to Trailing Sales Ratio','EV to EBIT Ratio','EV to EBITDA Ratio','EV To Sales Ratio','Expected Growth in Earnings Per Share','Expected Growth in Revenues','Free Cash Flow to Firm','Firm Value','Ratio of Fixed Assets to Total Assets','Forward Earnings Per Share','Forward PE Ratio','Growth in Earnings Per Share','Previous Year Growth in Revenues','Hi-Lo Risk','Insider Holdings','Institutional Holdings','Ratio of Intangible Assets to Total Assets','Invested Capital','Market Capitalization','Market Debt to Equity Ratio','Market Debt to Capital Ratio','Net Income','Net Margin','Non-Cash Working Capital','Non-Cash Working Capital as Percentage of Revenues','Payout Ratio','Price to Book Value Ratio','PE to Growth Ratio','Pre-Tax Operating Margin','Price to Sales Ratio','Reinvestment Amount','Reinvestment Rate','Revenues','Return on Capital','Return on Equity','Sales General and Administration Expenses','Stock Price','Total Debt','Trading Volume','Trailing 12-month Revenues','Trailing Net Income','Trailing PE Ratio','Trailing Revenues','Value Line Beta','EV to Book Value Ratio'];
        this.keys = ['date','number_of_shares_outstanding','3-year_regression_beta','3-year_standard_deviation_of_stock_price','book_debt_to_capital_ratio','book_value_of_equity','book_value_of_assets','capital_expenditures','cash','cash_as_percentage_of_firm_value','cash_as_percentage_of_revenues','cash_as_percentage_of_total_assets','change_in_non-cash_working_capital','correlation_with_the_market','current_pe_ratio','depreciation','dividend_yield','dividends','earnings_before_interest_and_taxes','ebit_for_previous_period','earnings_before_interest_taxes_depreciation_and_amortization','effective_tax_rate','effective_tax_rate_on_income','enterprise_value','ev_to_invested_capital_ratio','ev_to_trailing_sales_ratio','ev_to_ebit_ratio','ev_to_ebitda_ratio','ev_to_sales_ratio','expected_growth_in_earnings_per_share','expected_growth_in_revenues','free_cash_flow_to_firm','firm_value','ratio_of_fixed_assets_to_total_assets','forward_earnings_per_share','forward_pe_ratio','growth_in_earnings_per_share','previous_year_growth_in_revenues','hi-lo_risk','insider_holdings','institutional_holdings','ratio_of_intangible_assets_to_total_assets','invested_capital','market_capitalization','market_debt_to_equity_ratio','market_debt_to_capital_ratio','net_income','net_margin','non-cash_working_capital','non-cash_working_capital_as_percentage_of_revenues','payout_ratio','price_to_book_value_ratio','pe_to_growth_ratio','pre-tax_operating_margin','price_to_sales_ratio','reinvestment_amount','reinvestment_rate','revenues','return_on_capital','return_on_equity','sales_general_and_administration_expenses','stock_price','total_debt','trading_volume','trailing_12-month_revenues','trailing_net_income','trailing_pe_ratio','trailing_revenues','value_line_beta','ev_to_book_value_ratio'];
        this.testKeys = ['date', 'itemA', 'itemB'];
        this.testRecords = ['2012-09-28', 'valueA', 'valueB'];
        this.testKeyValuePairs = { date:'20120928', itemA: 'valueA', 'itemB':'valueB' };
        callback();
    },

    'extractTitles': function(test) {
        test.deepEqual(parser.extractTitles(this.jsonObj), this.titles, 'titles should match.');
        test.done();
    },

    'titlesToKeys': function(test) {
        test.deepEqual(parser.titlesToKeys(this.titles), this.keys, 'keys should match.');
        test.done();
    },

    'keyToValuePairs':function(test) {
        test.deepEqual(parser.keyToValuePairs(this.testKeys, this.testRecords),
                       this.testKeyValuePairs,
                       'should match');
        test.done();
    }
};