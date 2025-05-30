import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from "@playwright/test/reporter";
import { error } from "console";
import * as fs from "fs";

class MyReporter implements Reporter {
    onBegin(config: FullConfig, suite: Suite): void {
        console.log(`Executing ${suite.allTests().length} tests`)
    }

    onEnd(result: FullResult): Promise<{ status?: FullResult["status"]; } | undefined | void> | void {
     console.log(`Execution is finished with ${result.status} status`)   
    }

    onTestBegin(test: TestCase, result: TestResult): void {
        console.log(`Executing ${test.title} test`)
    }

    onTestEnd(test: TestCase, result: TestResult): void {
        const data = {
            test: test.title,
            status: result.status,
            duration: result.duration,
            errors: result.errors
        }
        
        const dataToString = JSON.stringify(data);

        fs.writeFileSync('testResult.json', dataToString)


        console.log(`Finished: `, dataToString)
    }

}