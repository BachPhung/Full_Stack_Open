export type DiagnoseEntry = {
    code: string,
    name: string,
    latin?:string
}

export type Entry = {

}

export type PatientEntry = {
    id:string,
    name:string,
    dateOfBirth:string,
    ssn:string,
    gender:string,
    occupation:string,
    entries: Entry[]
}
export type NewPatientEntry = {
    name:string,
    dateOfBirth:string,
    ssn:string,
    gender:string,
    occupation:string,
    entries: Entry[]
}
export enum Gender {
    Male = 'male',
    Female = 'female'
}
type NonSSNEntries = Omit<PatientEntry,'ssn' | 'entries'>
export default NonSSNEntries
