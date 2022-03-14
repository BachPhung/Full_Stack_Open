export type DiagnoseEntry = {
    code: string,
    name: string,
    latin?:string
}

export type PatientEntry = {
    id:string,
    name:string,
    dateOfBirth:string,
    ssn:string,
    gender:string,
    occupation:string
}
export type NewPatientEntry = {
    name:string,
    dateOfBirth:string,
    ssn:string,
    gender:string,
    occupation:string
}
export enum Gender {
    Male = 'male',
    Female = 'female'
}
type NonSSNEntries = Omit<PatientEntry,'ssn'>
export default NonSSNEntries
