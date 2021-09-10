export class TooSimple extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, TooSimple);
    }
}

export class TooLarge extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, TooLarge);
    }
}

const MAX_NUMBER: number = 1000;

export class AdditionCalculator {
    add(nums: number[]) : Promise<number> {
        return new Promise<number>((resolve, reject) => {
            if (nums.length === 0) {
                reject(new TooSimple());
            }

            nums.forEach(num => {
                if (num > MAX_NUMBER) {
                    reject(new TooLarge());
                }
            });

            resolve(nums.reduce((prevVal, currentVal) => prevVal + currentVal));
        });
    }
}
