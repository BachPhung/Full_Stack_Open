// interface MultiplyValues2 {
//     period: Array<number>,
//     targetDaily: number,
// }
// const parseArguments2 = (args: Array<string>): MultiplyValues2 => {
//     if (args.length < 4) throw new Error('Not enough arguments');
//     let periodArray:Array<string> = args.slice(2, args.length-1);
//     let periodArrayToNumber: Array<number> = periodArray.map((item:string)=>Number(item));
//     console.log("length: ",args.length-2);
//     console.log('args',args);
//     return {
//         period: periodArrayToNumber,
//         targetDaily: Number(args[args.length -1])
//     }
// }
export interface Report {
    periodLength: number,
    trainingDays: number,
    success: true | false,
    rating: number,
    ratingDescription: string,
    target:number,
    average: number
}

const calculateExercises = (arr:Array<number>, dailyTarget:number): Report => {
    let average:number = parseFloat((arr.reduce((preV,curV)=>preV+curV,0)/arr.length).toFixed(2));
    
    let periodLength:number = arr.length;
    
    let trainingDays:number = arr.filter(day=>day!=0).length;
    console.log('trainingDays',trainingDays);
    
    let success = average > dailyTarget;
    let rating:number;
    switch(true){
        case average/dailyTarget <= 0.6:{
            rating = 1;
            break;
        }
        case average/dailyTarget < 1:{
            rating = 2;
            break;
        }
        case average/dailyTarget >= 1:{
            rating = 3;
            break;
        }
        default:{
            rating = 0;
            break
        }
    }
    let ratingDescription:string = rating === 3 ?  'You did great job!' :  'not too bad but could be better';
    let target:number = dailyTarget;
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

// try{
//     const {period, targetDaily} = parseArguments2(process.argv);
//     console.log(calculateExercises(period,targetDaily));
// }
// catch(error:unknown){
//     let errorMessage = 'Something bad happened.';
//     if(error instanceof Error){
//         errorMessage += "Error: "+ error.message;
//     }
//     console.log(errorMessage);
// }

export default calculateExercises
