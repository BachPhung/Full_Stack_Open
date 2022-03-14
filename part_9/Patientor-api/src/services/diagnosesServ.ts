import diagnosesEntries from '../data/diagnose';
import { DiagnoseEntry } from '../types'
const diagnores:Array<DiagnoseEntry> = diagnosesEntries;
const getEntries = () => {
    return diagnores
}

const addDiagnose = () => {
    return null
}

export default {
    getEntries,
    addDiagnose
}