import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from "@playwright/test/reporter";
import { error } from "console";
import * as fs from "fs";

class MyReporter implements Reporter {
    private testResults: any[] = [];

    onBegin(config: FullConfig, suite: Suite): void {
        console.log(`Executing ${suite.allTests().length} tests`)
        this.testResults = []; // Reset results array
    }

    onEnd(result: FullResult): Promise<{ status?: FullResult["status"]; } | undefined | void> | void {
        // Write all test results at the end
        const allResults = {
            executionStatus: result.status,
            totalTests: this.testResults.length,
            tests: this.testResults
        };
        
        const dataToString = JSON.stringify(allResults, null, 2);
        fs.writeFileSync('testResult.json', dataToString);
        
        console.log(`Execution is finished with ${result.status} status`)   
    }

    onTestBegin(test: TestCase, result: TestResult): void {
        const browserName = test.parent.project()?.name || 'unknown';
        console.log(`Executing ${test.title} test in ${browserName} browser`)
    }

    onTestEnd(test: TestCase, result: TestResult): void {
        // Get browser name from the project
        const browserName = test.parent.project()?.name || 'unknown';
        
        const data = {
            test: test.title,
            status: result.status,
            duration: result.duration,
            errors: result.errors,
            browser: browserName,
        }
        
        // Add to results array instead of writing immediately
        this.testResults.push(data);
        
        console.log(`Finished: `, JSON.stringify(data, null, 2))
    }
}

export default MyReporter