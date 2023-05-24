export interface ValidationFile {
    validate: (file:Buffer) => Promise<boolean>
}