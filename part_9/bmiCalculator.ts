const calculateBmi = (height:number, weight:number) => {
    const Bmi = weight/(Math.pow(height,2)/10000);
    switch(true){
        case Bmi<16:{
            return "Underweight (Severe thinness)";
        }
        case Bmi<=16.9:{
            return "Underweight (Moderate thinness)";
        }
        case Bmi<=18.4:{
            return "Underweight (Mild thinness)";
        }
        case Bmi<=24.9:{
            return "Normal range";
        }
        case Bmi<=29.9:{
            return "Overweight (Pre-obese)";
        }
        case Bmi<=34.9:{
            return "Obese (Class I)";
        }
        case Bmi<=39.9:{
            return "Obese (Class II)";
        }
        case Bmi>39.9:{
            return "Obese (Class III)";
        }
        default:{
            return "Out of range";
        }
    }
}

console.log(calculateBmi(180, 74));