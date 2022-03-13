import express, { Request, Response } from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises, { Report } from './exerciseCalculator';
const app = express();

app.use(express.json())
app.get('/ping', (_req, res) => {
    res.send('pong');
});
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});
app.get('/bmi', (req: Request, res: Response) => {
    try {
        const { query } = req;
        let bmiString: string = calculateBmi(Number(query.height), Number(query.weight));
        res.status(200).json({
            height: query.height,
            weight: query.weight,
            bmi: bmiString
        });
    }
    catch (error: unknown) {
        res.status(400).json({ error: 'malformatted parameters' });
    }
})

interface BodyRequest {
    daily_exercises: Array<number>,
    target: number
}

app.post('/exercises', (req:Request, res:Response<Report | unknown>)=>{
    const body:BodyRequest = req.body;
    if(!(body.daily_exercises && body.target)){
        throw new Error('missing parameter')
    }
    if(isNaN(body.target) || !Array.isArray(body.daily_exercises)){
        console.log(typeof body.target);
        
        throw new Error('malfomatted parameters')
    }
    try{
        let report:Report = calculateExercises(body.daily_exercises,body.target)
        res.status(200).json(report)

    }
    catch(err: any){
        res.status(400).json(err)
    }   
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});