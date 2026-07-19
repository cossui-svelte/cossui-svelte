export type FileMetadata = {
  name: string;
  size: number;
  type: string;
  url: string;
  id: string;
};

export type FileWithPreview = {
  file: File | FileMetadata;
  id: string;
  preview?: string;
};

export type FileUploadOptions = {
  maxFiles?: number; // Only used when multiple is true, defaults to Infinity
  maxSize?: number; // in bytes
  accept?: string;
  multiple?: boolean; // Defaults to false
  initialFiles?: FileMetadata[];
  onFilesChange?: (files: FileWithPreview[]) => void; // Callback when files change
  onFilesAdded?: (addedFiles: FileWithPreview[]) => void; // Callback when new files are added
};

export class FileUpload {
  #files = $state<FileWithPreview[]>([]);
  #isDragging = $state(false);
  #errors = $state<string[]>([]);
  #fileInput = $state<HTMLInputElement | null>(null);

  #maxFiles: number;
  #maxSize: number;
  #accept: string;
  #multiple: boolean;
  #onFilesChange?: (files: FileWithPreview[]) => void;
  #onFilesAdded?: (addedFiles: FileWithPreview[]) => void;

  constructor(options: FileUploadOptions = {}) {
    const {
      maxFiles = Number.POSITIVE_INFINITY,
      maxSize = Number.POSITIVE_INFINITY,
      accept = '*',
      multiple = false,
      initialFiles = [],
      onFilesChange,
      onFilesAdded
    } = options;

    this.#maxFiles = maxFiles;
    this.#maxSize = maxSize;
    this.#accept = accept;
    this.#multiple = multiple;
    this.#onFilesChange = onFilesChange;
    this.#onFilesAdded = onFilesAdded;

    this.#files = initialFiles.map((file) => ({
      file,
      id: file.id,
      preview: file.url
    }));
  }

  get files() {
    return this.#files;
  }

  get isDragging() {
    return this.#isDragging;
  }

  get errors() {
    return this.#errors;
  }

  get fileInput() {
    return this.#fileInput;
  }

  set fileInput(input: HTMLInputElement | null) {
    this.#fileInput = input;
  }

  get inputProps() {
    return {
      accept: this.#accept,
      multiple: this.#multiple,
      onchange: this.handleFileChange,
      type: 'file' as const
    };
  }

  #validateFile = (file: File | FileMetadata): string | null => {
    if (file.size > this.#maxSize) {
      return `File "${file.name}" exceeds the maximum size of ${formatBytes(this.#maxSize)}.`;
    }

    if (this.#accept !== '*') {
      const acceptedTypes = this.#accept.split(',').map((type) => type.trim());
      const fileType = file instanceof File ? file.type || '' : file.type;
      const fileExtension = `.${file.name.split('.').pop()}`;

      const isAccepted = acceptedTypes.some((type) => {
        if (type.startsWith('.')) {
          return fileExtension.toLowerCase() === type.toLowerCase();
        }
        if (type.endsWith('/*')) {
          const baseType = type.split('/')[0];
          return fileType.startsWith(`${baseType}/`);
        }
        return fileType === type;
      });

      if (!isAccepted) {
        return `File "${file.name}" is not an accepted file type.`;
      }
    }

    return null;
  };

  #createPreview = (file: File | FileMetadata): string | undefined => {
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return file.url;
  };

  #generateUniqueId = (file: File | FileMetadata): string => {
    if (file instanceof File) {
      return `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    }
    return file.id;
  };

  clearFiles = () => {
    for (const file of this.#files) {
      if (file.preview && file.file instanceof File && file.file.type.startsWith('image/')) {
        URL.revokeObjectURL(file.preview);
      }
    }

    if (this.#fileInput) {
      this.#fileInput.value = '';
    }

    this.#errors = [];
    this.#files = [];
    this.#onFilesChange?.(this.#files);
  };

  addFiles = (newFiles: FileList | File[]) => {
    if (!newFiles || newFiles.length === 0) return;

    const newFilesArray = Array.from(newFiles);
    const errors: string[] = [];

    this.#errors = [];

    // In single file mode, clear existing files first
    if (!this.#multiple) {
      this.clearFiles();
    }

    // Check if adding these files would exceed maxFiles (only in multiple mode)
    if (
      this.#multiple &&
      this.#maxFiles !== Number.POSITIVE_INFINITY &&
      this.#files.length + newFilesArray.length > this.#maxFiles
    ) {
      errors.push(`You can only upload a maximum of ${this.#maxFiles} files.`);
      this.#errors = errors;
      return;
    }

    const validFiles: FileWithPreview[] = [];

    for (const file of newFilesArray) {
      if (this.#multiple) {
        const isDuplicate = this.#files.some(
          (existingFile) =>
            existingFile.file.name === file.name && existingFile.file.size === file.size
        );

        if (isDuplicate) {
          continue;
        }
      }

      if (file.size > this.#maxSize) {
        errors.push(
          this.#multiple
            ? `Some files exceed the maximum size of ${formatBytes(this.#maxSize)}.`
            : `File exceeds the maximum size of ${formatBytes(this.#maxSize)}.`
        );
        continue;
      }

      const error = this.#validateFile(file);

      if (error) {
        errors.push(error);
        continue;
      }

      validFiles.push({
        file,
        id: this.#generateUniqueId(file),
        preview: this.#createPreview(file)
      });
    }

    // Only update state if we have valid files to add
    if (validFiles.length > 0) {
      // Call the onFilesAdded callback with the newly added valid files
      this.#onFilesAdded?.(validFiles);

      const newFiles = !this.#multiple ? validFiles : [...this.#files, ...validFiles];
      this.#files = newFiles;
      this.#errors = errors;
      this.#onFilesChange?.(newFiles);
    } else if (errors.length > 0) {
      this.#errors = errors;
    }

    // Reset input value after handling files
    if (this.#fileInput) {
      this.#fileInput.value = '';
    }
  };

  removeFile = (id: string) => {
    const fileToRemove = this.#files.find((file) => file.id === id);
    if (
      fileToRemove?.preview &&
      fileToRemove.file instanceof File &&
      fileToRemove.file.type.startsWith('image/')
    ) {
      URL.revokeObjectURL(fileToRemove.preview);
    }

    const newFiles = this.#files.filter((file) => file.id !== id);
    this.#files = newFiles;
    this.#errors = [];
    this.#onFilesChange?.(newFiles);
  };

  clearErrors = () => {
    this.#errors = [];
  };

  handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.#isDragging = true;
  };

  handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if ((e.currentTarget as HTMLElement)?.contains(e.relatedTarget as Node)) {
      return;
    }

    this.#isDragging = false;
  };

  handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.#isDragging = false;

    // Don't process files if the input is disabled
    if (this.#fileInput?.disabled) {
      return;
    }

    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      // In single file mode, only use the first file
      if (!this.#multiple) {
        const file = e.dataTransfer.files[0];
        this.addFiles([file]);
      } else {
        this.addFiles(e.dataTransfer.files);
      }
    }
  };

  handleFileChange = (e: Event & { currentTarget: HTMLInputElement }) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      this.addFiles(e.currentTarget.files);
    }
  };

  openFileDialog = () => {
    this.#fileInput?.click();
  };
}

export function useFileUpload(options?: FileUploadOptions) {
  return new FileUpload(options);
}

// Helper function to format bytes to human-readable format
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Number.parseFloat((bytes / k ** i).toFixed(dm)) + sizes[i];
};
