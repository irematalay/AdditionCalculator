import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import {AdditionCalculator, TooLarge, TooSimple} from "../src/AdditionCalculator";
import {testFolder} from "@ubccpsc310/folder-test";

chai.use(chaiAsPromised);

type Input = number[];
type Output = Promise<number>;
type Error = "TooSimple" | "TooLarge";

describe("AdditionCalculator", function () {
    describe("Add", function () {

        let additionCalculator: AdditionCalculator;
        beforeEach(function () {
            additionCalculator = new AdditionCalculator();
        });

        it("should add two positive numbers", async function () {
            const result = await additionCalculator.add([1,2]);

            expect(result).to.equals(3);
        });

        it("should add two negative numbers", function () {
           const result = additionCalculator.add([-1, -3]);

           return expect(result).eventually.to.equals(-4);
        });

        it("should reject with TooSimple if the array is empty", function () {
            const result = additionCalculator.add([]);

            return expect(result).eventually.to.be.rejectedWith(TooSimple);
        });

        it("should reject with TooLarge if an element of the array is greater than 1000", function () {
            const result = additionCalculator.add([1001,1]);

            return expect(result).eventually.to.be.rejectedWith(TooLarge);
        });
    });

    testFolder<Input, Output, Error>(
        "Add Dynamic",
        (input: Input): Output => {
            const additionCalculator = new AdditionCalculator();
            return additionCalculator.add(input);
        },
        "./test/resources/json",
        {
            errorValidator: (error): error is Error =>
                error === "TooSimple" || error === "TooLarge",
            assertOnError: ((expected, actual) => {
                if (expected === "TooSimple") {
                    expect(actual).to.be.instanceof(TooSimple);
                } else if (expected === "TooLarge") {
                    expect(actual).to.be.instanceof(TooLarge);
                } else {
                    // this should be unreachable
                    expect.fail("UNEXPECTED ERROR");
                }
            })
        }
    )
});
