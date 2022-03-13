interface Report {
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
    let trainingDays:number = arr.filter((item:number)=>{
        item != 0;
    }).length;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2));
