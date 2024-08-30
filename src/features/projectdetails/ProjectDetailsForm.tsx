import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ProjectDetails } from '../../app/models/ProjectDetails';
import { useStore } from '../../app/stores/store';
import '../../App1.css'; // Import the CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

const ProjectDetailsForm: React.FC<{ projectDetails?: ProjectDetails }> = ({ projectDetails }) => {
    const { projectDetailsStore } = useStore();
    const [formValues, setFormValues] = useState<ProjectDetails>({
        id: projectDetails?.id || '',
        location: projectDetails?.location || '',
        year: projectDetails?.year || '',
        status: projectDetails?.status || '',
        video: projectDetails?.video || '',
        projectId: projectDetails?.projectId || '',
        images: projectDetails?.images || []
    });

    const navigate = useNavigate();
    const [videoFile, setVideoFile] = useState<File | undefined>(undefined);
    const [imageFiles, setImageFiles] = useState<File[]>([]); // Store image files
    const [imageInputs, setImageInputs] = useState<string[]>(['']); // Start with one input

    useEffect(() => {
        const loadProjects = async () => {
            await projectDetailsStore.loadProjects();
        };

        loadProjects();
    }, [projectDetailsStore]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setVideoFile(e.target.files[0]);
        }
    };

    const handleImageChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            try {
                const compressedFile = await imageCompression(files[0], {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                });
                const updatedImageFiles = [...imageFiles];
                updatedImageFiles[index] = compressedFile;
                setImageFiles(updatedImageFiles);
            } catch (error) {
                console.error('Error compressing image:', error);
            }
        }
    };

    const addImageInput = () => {
        setImageInputs([...imageInputs, '']);
    };

    const removeImageInput = (index: number) => {
        setImageInputs(imageInputs.filter((_, i) => i !== index));
        setImageFiles(imageFiles.filter((_, i) => i !== index));
    };

    

    const uploadProjectDetails = async () => {
        const formData = new FormData();

        // Append video file
        if (videoFile) {
            formData.append('videoFile', videoFile);
        }

        // Append image files
        imageFiles.forEach((file) => {
            if (file) {
                formData.append('ImageFiles', file); // Ensure the name matches the backend
            }
        });

        // Append other form data
        formData.append('location', formValues.location);
        formData.append('year', formValues.year);
        formData.append('status', formValues.status);
        formData.append('projectId', formValues.projectId);

        const response = await axios.post('/ProjectDetails/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const response = await uploadProjectDetails();
            console.log('Upload successful:', response);
            navigate('/admin/manage-project-details');
        } catch (error) {
            console.error('Error uploading project details:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>{projectDetails ? 'Edit Project Details' : 'Add Project Details'}</h2>
            <form onSubmit={handleSubmit} className="project-details-form">
                <div className="form-group">
                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formValues.location}
                        onChange={handleChange}
                        placeholder="Location"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Year</label>
                    <input
                        type="text"
                        name="year"
                        value={formValues.year}
                        onChange={handleChange}
                        placeholder="Year"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <input
                        type="text"
                        name="status"
                        value={formValues.status}
                        onChange={handleChange}
                        placeholder="Status"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Project</label>
                    <select
                        name="projectId"
                        value={formValues.projectId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a Project</option>
                        {projectDetailsStore.projects.map(project => (
                            <option key={project.id} value={project.id}>
                                {project.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Upload Video</label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                    />
                </div>

                {/* Image upload section */}
                {imageInputs.map((input, index) => (
                    <div key={index} className="form-group image-upload-group">
                        <label>Upload Image {index + 1}</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(index, e)}
                        />
                        <button type="button" onClick={() => removeImageInput(index)} className="remove-image-button">
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addImageInput} className="btn btn-secondary">
                    Add Another Image
                </button>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default observer(ProjectDetailsForm);

