import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Typography,
  Box
} from '@mui/material';
import { User } from 'lucide-react';

interface User {
  avatar?: string;
  username?: string;
}

interface AvatarUploadDialogProps {
  open: boolean;
  onClose: () => void;
  user: User;
  onSave: () => Promise<void>;
  onUpload: (file: File) => Promise<void>;
}

export function AvatarUploadDialog({ open, onClose, user, onSave, onUpload }: AvatarUploadDialogProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("File size should not exceed 5MB");
        return;
      }
      setSelectedFile(file);
      await onUpload(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    if (selectedFile) {
      try {
        await onSave();
        onClose();
      } catch (error) {
        console.error(error);
        setError("Failed to upload image. Please try again.");
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Update Avatar</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
          <Avatar
            src={previewUrl || user.avatar}
            alt={user.username}
            sx={{ width: 150, height: 150, mb: 2 }}
          >
            {!user.avatar && !previewUrl && (
              <User style={{ width: 80, height: 80 }} />
            )}
          </Avatar>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <Box display="flex" gap={2}>
            <Button variant="contained" onClick={handleUploadClick}>
              Upload Image
            </Button>
            {previewUrl && (
              <Button variant="outlined" onClick={() => setPreviewUrl(null)}>
                Remove
              </Button>
            )}
          </Box>
          {error && (
            <Typography color="error" variant="body2" mt={1}>
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} disabled={!selectedFile} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}