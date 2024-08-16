import axios from 'axios';

export const getSasToken = async (blobName: string): Promise<string> => {
    const response = await axios.get(`/api/blob/generateSasToken?blobName=${blobName}&containerName=zabeliarchitects`);
    return response.data.token;
};

export const uploadVideoToBlob = async (file: File, sasToken: string) => {
    const url = `https://yourstorageaccount.blob.core.windows.net/zabeliarchitects/${file.name}?${sasToken}`;
    const headers = {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': file.type
    };

    try {
        const response = await axios.put(url, file, { headers });
        return response.data;
    } catch (error) {
        console.error('Error uploading video to blob:', error);
        throw error;
    }
};
