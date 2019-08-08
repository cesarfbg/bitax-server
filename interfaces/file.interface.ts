export interface FileUpload {
    name: string;
    data: any;
    size: number;
    tempFilePath: string; 
    mimetype: string;

    mv: Function;
}