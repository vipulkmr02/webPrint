import { Printer } from "./printer"

export interface contextType {
    jobName: string | null,
    file: {
        name: string,
        uri: string,
        type: string
        uploadStatus: 'uploaded' | 'uploading' | null
        setUploadStatus: (status: 'uploaded' | 'uploading' | null) => void
    } | null,
    settings: {
        DoubleSided: boolean,
        Landscape: boolean,
        serverConfig: { HOST: string, PORT: number }
    }, printer: Printer | null
}

