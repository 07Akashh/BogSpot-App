import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPost } from '../../../services/BlogPostService';
import Input from '../../shared/Input';
import MediaInput from '../../shared/MediaInput';
import Textarea from '../../shared/TextArea';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createFormData } from '../../utils/utils';

const AddPost = ({ onPostAdded, closeButton }) => {
    const [formData, setFormData] = useState(initializeFormData());
    const [uploading, setUploading] = useState(false);
    const [postAdded, setPostAdded] = useState(false);
    const fileInputRef = useRef(null);

    const handleChange = useCallback((e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'media' && files.length > 0 ? files[0] : value
        }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            const formDataObject = createFormData(formData);
            await createPost(formDataObject);
            setPostAdded(true);
            toast.success('Post added successfully!');
            onPostAdded?.();
            setFormData(initializeFormData());
        } catch (error) {
            toast.error('Failed to add post.');
            console.error('Error adding post:', error);
        } finally {
            setUploading(false);
        }
    }, [formData, onPostAdded]);

    const handleMediaClick = useCallback(() => {
        fileInputRef.current.click();
    }, []);

    useEffect(() => {
        if (postAdded) {
            window.location.reload();
        }
    }, [postAdded]);

    return (
        <>
            <ToastContainer />
            <div className="bg-gray-100 border border-gray-300 p-5 rounded-lg shadow w-full max-w-lg mx-auto">
                {closeButton}
                <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                    <Input
                        type="text"
                        name="title"
                        value={formData.title}
                        handleChange={handleChange}
                        placeholder="Title"
                    />
                    <Textarea
                        name="content"
                        value={formData.content}
                        handleChange={handleChange}
                        placeholder="Content"
                    />
                    <MediaInput
                        previewMedia={formData.media}
                        onClick={handleMediaClick}
                        fileInputRef={fileInputRef}
                        handleChange={handleChange}
                    />
                    <button type="submit" disabled={uploading} className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Add Post
                    </button>
                </form>
                {uploading && <p>Uploading...</p>}
            </div>
        </>
    );
};

const initializeFormData = () => ({
    title: '',
    content: '',
    media: ''
});


export default AddPost;