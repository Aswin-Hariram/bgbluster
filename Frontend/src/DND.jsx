import { useState } from "react";
import download from "./assets/downloadIcon.svg";
import imag from "./assets/img.svg";
import imagw from "./assets/imgw.svg";
import dlt from "./assets/deleteIcon.svg";
import add from "./assets/add.svg";
import retry from "./assets/retry.svg";
import edit from "./assets/edit.svg";
import cloud from "./assets/cloud.svg";
import right from "./assets/right.svg";
import down from "./assets/down.svg";
import back from "./assets/back.svg";
import start from "./assets/start.svg";
import close from "./assets/close.svg";

const DND = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [processedImages, setProcessedImages] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState("");
    const [selectionMode, setSelectionMode] = useState(true);
    const [processingStatus, setProcessingStatus] = useState({});
    
    // API endpoint configuration
    const API_URL = "http://127.0.0.1:8001";

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        handleFileSelect({ target: { files } });
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const validFiles = [];
        for (const file of files) {
            if (!file.type.startsWith("image/")) {
                setError("Please upload valid image files only.");
                return;
            }
            if (file.size > 15 * 1024 * 1024) {
                setError("Each file should be less than 15MB.");
                return;
            }
            validFiles.push({
                file: file, // Store the actual file object
                url: URL.createObjectURL(file),
                name: file.name,
            });
        }

        setError("");
        setUploadedImages((prev) => [...prev, ...validFiles]);
        setSelectionMode(true);
    };

    const removeImage = (index) => {
        const newImages = [...uploadedImages];
        // Revoke object URL to prevent memory leaks
        URL.revokeObjectURL(newImages[index].url);
        newImages.splice(index, 1);
        setUploadedImages(newImages);

        // Also remove from processed images if it exists
        if (processedImages[index]) {
            const newProcessed = [...processedImages];
            newProcessed.splice(index, 1);
            setProcessedImages(newProcessed);
        }
        
        // Remove from processing status
        const newStatus = {...processingStatus};
        delete newStatus[index];
        setProcessingStatus(newStatus);
    };

    const processImages = async () => {
        if (uploadedImages.length === 0) return;
        
        setIsProcessing(true);
        setSelectionMode(false);
        
        // Create a new processed images array with initial null values
        const newProcessed = Array(uploadedImages.length).fill(null);
        setProcessedImages(newProcessed);
        
        // Initialize processing status for each image
        const initialStatus = {};
        uploadedImages.forEach((_, index) => {
            initialStatus[index] = "processing";
        });
        setProcessingStatus(initialStatus);

        // Option 1: Process one by one
        for (let i = 0; i < uploadedImages.length; i++) {
            await processImage(i);
        }
        
        // Option 2: Process all at once (uncomment if the API supports batch processing)
        // await processAllImagesAtOnce();
        
        setIsProcessing(false);
    };
    
    const processImage = async (index) => {
        const image = uploadedImages[index];
        setProcessingStatus(prev => ({...prev, [index]: "processing"}));
        
        try {
            const formData = new FormData();
            formData.append('file', image.file);
            
            const response = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                body: formData,
            });
            
            if (!response.ok) {
                throw new Error(`Failed to process image: ${response.statusText}`);
            }
            
            // Get the blob from the response
            const blob = await response.blob();
            const processedUrl = URL.createObjectURL(blob);
            
            // Update processed images array
            setProcessedImages(prev => {
                const newProcessed = [...prev];
                newProcessed[index] = processedUrl;
                return newProcessed;
            });
            
            setProcessingStatus(prev => ({...prev, [index]: "complete"}));
        } catch (error) {
            console.error("Error processing image:", error);
            setProcessingStatus(prev => ({...prev, [index]: "error"}));
        }
    };
    
    const processAllImagesAtOnce = async () => {
        try {
            const formData = new FormData();
            uploadedImages.forEach(image => {
                formData.append('files', image.file);
            });
            
            const response = await fetch(`${API_URL}/upload-multiple`, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`Failed to process images: ${response.statusText}`);
            }
            
            // Handle zip file containing all processed images
            const blob = await response.blob();
            
            // Extract files from zip (this part would need a zip library like JSZip)
            // For now, we'll just set a download link for the zip
            const downloadUrl = URL.createObjectURL(blob);
            
            // Set all as complete
            const completedStatus = {};
            uploadedImages.forEach((_, index) => {
                completedStatus[index] = "complete";
            });
            setProcessingStatus(completedStatus);
            
            // Add zip download option
            setProcessedImages(prev => [...prev, downloadUrl]);
        } catch (error) {
            console.error("Error processing images in batch:", error);
            
            // Set all as error
            const errorStatus = {};
            uploadedImages.forEach((_, index) => {
                errorStatus[index] = "error";
            });
            setProcessingStatus(errorStatus);
        }
    };
    
    const retryProcessImage = async (index) => {
        setProcessingStatus(prev => ({...prev, [index]: "processing"}));
        await processImage(index);
    };

    const clearImages = () => {
        // Clean up any object URLs to prevent memory leaks
        uploadedImages.forEach(image => {
            URL.revokeObjectURL(image.url);
        });
        
        processedImages.forEach(url => {
            if (url) URL.revokeObjectURL(url);
        });

        setUploadedImages([]);
        setProcessedImages([]);
        setIsProcessing(false);
        setError("");
        setSelectionMode(true);
        setProcessingStatus({});
    };

    return (
        <div id="upload-area" className="mt-6 md:mt-12 mb-8 md:mb-16 px-4 md:px-0">
            {uploadedImages.length === 0 ? (
                <div
                    className={`border-2 border-dashed rounded-2xl p-6 md:p-12 flex flex-col items-center justify-center transition-all cursor-pointer ${isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-indigo-400"
                        }`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-input').click()}
                >
                    <input
                        type="file"
                        id="file-input"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleFileSelect}
                    />

                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <img src={cloud} alt="Upload Icon" className="w-16 h-16" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">Drop your images here</h3>
                    <p className="text-gray-500 text-sm mb-6">or click to browse files</p>

                    <div className="flex items-center bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm">
                        <span className="mr-2"><img src={imag} alt="" /></span>
                        Supported formats: PNG, JPG - Max file size: 15MB each
                    </div>

                    {error && (
                        <div className="mt-4 text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">
                            {error}
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl overflow-hidden shadow-lg">
                    {/* Header bar with actions */}
                    <div className="bg-white px-4 md:px-8 py-4 md:py-6 flex flex-col md:flex-row md:items-center justify-between border-b border-indigo-100 space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <div className="bg-indigo-600 rounded-full p-2">
                                <img src={imagw} alt="Logo" className="w-6 h-6 md:w-8 md:h-8" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Magic Transform</h2>
                            <div className="flex items-center bg-indigo-100 text-indigo-800 px-2 md:px-3 py-1 rounded-full text-xs font-medium">
                                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-1.5"></span>
                                {isProcessing ? "Processing" : selectionMode ? "Ready" : "Complete"}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 md:space-x-4">
                            <button
                                onClick={() => document.getElementById('file-input').click()}
                                className="flex items-center text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors"
                            >
                                <img src={add} alt="Upload" className="h-5 w-5 mr-1" />
                                Upload More
                            </button>

                            <input
                                type="file"
                                id="file-input"
                                className="hidden"
                                accept="image/*"
                                multiple
                                onChange={handleFileSelect}
                            />

                            <button
                                onClick={clearImages}
                                className="flex items-center text-gray-600 hover:text-red-600 text-sm font-medium transition-colors"
                            >
                                <img src={dlt} alt="Delete" className="h-5 w-5 mr-1" />
                                Clear All
                            </button>

                            {selectionMode && (
                                <button
                                    onClick={processImages}
                                    className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium px-6 md:px-8 py-2 md:py-3 rounded-lg text-sm md:text-base shadow-md hover:shadow-lg transition-shadow flex items-center justify-center"
                                    disabled={isProcessing || uploadedImages.length === 0}
                                >
                                    <img src={start} alt="Start" className="h-5 w-5 md:h-6 md:w-6 mr-1" />
                                    Start Background Removal
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Selection mode - Show uploaded images grid */}
                    {selectionMode && (
                        <div className="p-4 md:p-8">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Selected Images</h3>

                            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                                {uploadedImages.map((img, index) => (
                                    <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden relative group">
                                        <div className="aspect-square overflow-hidden">
                                            <img
                                                src={img.url}
                                                alt={`Image ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-3 border-t border-gray-100">
                                            <p className="text-sm font-medium text-gray-800 truncate">{img.name}</p>
                                        </div>
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                        >
                                            <img src={close} alt="Delete" className="h-4 w-4" />
                                        </button>

                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 md:mt-8 flex justify-center">
                                <button
                                    onClick={processImages}
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium px-8 py-3 rounded-lg text-base shadow-md hover:shadow-lg transition-shadow flex items-center"
                                    disabled={isProcessing || uploadedImages.length === 0}

                                >
                                    <img src={start} alt="Start" className="h-6 w-6 mr-1" />
                                    Start Background Removal
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Comparison mode - Processing gallery */}
                    {!selectionMode && (
                        <div className="p-4 md:p-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 space-y-2 md:space-y-0">
                                <h3 className="text-lg md:text-xl font-semibold text-gray-800">Results</h3>
                                <button
                                    onClick={() => setSelectionMode(true)}
                                    className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                >
                                    <img src={back} alt="Back" className="h-4 w-4 mr-1" />
                                    Back to Selection
                                </button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                                {uploadedImages.map((img, index) => (
                                    <div key={index} className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        {/* Image header */}
                                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                            <div className="flex items-center space-x-3">
                                                <div className="bg-indigo-100 text-indigo-600 rounded-full h-8 w-8 flex items-center justify-center font-semibold">
                                                    {index + 1}
                                                </div>
                                                <h3 className="font-medium text-gray-800 truncate max-w-xs">{img.name}</h3>
                                            </div>

                                            <div className="text-xs font-medium text-gray-500">
                                                {processingStatus[index] === "processing" ? "Processing..." : 
                                                 processingStatus[index] === "error" ? "Error" : "Complete"}
                                            </div>
                                        </div>

                                        {/* Image comparison container */}
                                        <div className="flex flex-col md:flex-row">
                                            {/* Original Image */}
                                            <div className="flex-1 p-6">
                                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Original</div>
                                                <div className="bg-gray-50 rounded-xl h-64 flex items-center justify-center overflow-hidden p-2">
                                                    <img src={img.url} alt={`Original ${index}`} className="max-w-full max-h-full object-contain rounded-lg" />
                                                </div>
                                            </div>

                                            {/* Arrow divider for desktop */}
                                            <div className="hidden md:flex items-center justify-center px-2">
                                                <div className="bg-indigo-100 rounded-full p-2">
                                                    <img src={right} alt="Arrow" className="h-6 w-6 text-indigo-600" />
                                                </div>
                                            </div>

                                            {/* Arrow divider for mobile */}
                                            <div className="flex md:hidden items-center justify-center py-2">
                                                <div className="bg-indigo-100 rounded-full p-2">
                                                    <img src={down} alt="Arrow" className="h-6 w-6 text-indigo-600" />
                                                </div>
                                            </div>

                                            {/* Processed Image */}
                                            <div className="flex-1 p-6">
                                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Transparent Background</div>
                                                <div className="bg-gray-50 rounded-xl h-64 flex items-center justify-center overflow-hidden p-2 relative">
                                                    {/* Checkerboard pattern background for transparency */}
                                                    <div className="absolute inset-0 bg-opacity-50" style={{
                                                        backgroundImage: `
                                            linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
                                            linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
                                            linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
                                            linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
                                          `,
                                                        backgroundSize: '20px 20px',
                                                        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                                                    }}></div>

                                                    {processingStatus[index] === "processing" ? (
                                                        <div className="flex flex-col items-center z-10">
                                                            <div className="w-16 h-16 relative">
                                                                <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                                                                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xs font-medium text-indigo-600">
                                                                    AI
                                                                </div>
                                                            </div>
                                                            <p className="text-indigo-600 font-medium mt-4">Processing image...</p>
                                                            <p className="text-gray-500 text-xs mt-1">This may take a few seconds</p>
                                                        </div>
                                                    ) : processingStatus[index] === "error" ? (
                                                        <div className="text-red-500 bg-red-50 px-4 py-3 rounded-lg z-10">
                                                            <p className="font-medium">Processing error</p>
                                                            <p className="text-xs mt-1">Please try again</p>
                                                        </div>
                                                    ) : (
                                                        processedImages[index] && (
                                                            <img src={processedImages[index]} alt={`Processed ${index}`} className="max-w-full max-h-full object-contain rounded-lg z-10" />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions footer */}
                                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                            <div className="flex justify-between items-center">
                                                <div className="flex space-x-4">
                                                    <button
                                                        className="text-gray-500 hover:text-indigo-600 text-sm font-medium flex items-center"
                                                        onClick={() => retryProcessImage(index)}
                                                        disabled={processingStatus[index] === "processing"}
                                                    >
                                                        <img src={retry} alt="Retry" className="h-4 w-4 mr-1" />
                                                        Retry
                                                    </button>
                                                    <button 
                                                        className="text-gray-500 hover:text-indigo-600 text-sm font-medium flex items-center"
                                                        disabled={!processedImages[index] || processingStatus[index] !== "complete"}
                                                    >
                                                        <img src={edit} alt="Edit" className="h-4 w-4 mr-1" />
                                                        Edit
                                                    </button>
                                                </div>

                                                {processedImages[index] && processingStatus[index] === "complete" && (
                                                    <a
                                                        href={processedImages[index]}
                                                        download={`transparent-${img.name}`}
                                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm flex items-center shadow-sm hover:shadow transition-shadow"
                                                    >
                                                        <img src={download} alt="Download" className="h-4 w-4 mr-1" />
                                                        Download
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DND;