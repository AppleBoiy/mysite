import { toast } from "sonner";

/**
 * Safely handle file downloads with error checking
 * @param {string} url - The URL of the file to download
 * @param {string} filename - Optional filename for the download
 * @param {string} errorMessage - Custom error message
 */
export async function safeDownload(url, filename = null, errorMessage = 'File is currently unavailable') {
  try {
    // Check if file exists
    const response = await fetch(url, { method: 'HEAD' });
    
    if (response.ok) {
      // File exists, proceed with download
      const link = document.createElement('a');
      link.href = url;
      if (filename) {
        link.download = filename;
      }
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Download started', {
        duration: 2000,
      });
      
      return true;
    } else {
      // File not found
      toast.error(errorMessage, {
        description: 'Please contact me directly for this document',
        duration: 4000,
      });
      return false;
    }
  } catch (error) {
    // Network error or file not found
    console.error('Download error:', error);
    toast.error(errorMessage, {
      description: 'Please try again later or contact me directly',
      duration: 4000,
    });
    return false;
  }
}

/**
 * Check if a file exists at the given URL
 * @param {string} url - The URL to check
 * @returns {Promise<boolean>}
 */
export async function fileExists(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
}
