import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  VStack,
  HStack,
  IconButton,
  Tooltip,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  Text,
} from '@chakra-ui/react';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaLink,
  FaImage,
  FaCode,
  FaQuoteLeft,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from 'react-icons/fa';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
  onImageUpload?: (file: File) => Promise<string>;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start writing...',
  height = '400px',
  onImageUpload,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select an image file',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    try {
      let imageUrl: string;
      
      if (onImageUpload) {
        // Use custom upload handler
        imageUrl = await onImageUpload(file);
      } else {
        // Convert to base64 as fallback
        imageUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
      }

      // Insert image into editor
      const img = `<img src="${imageUrl}" alt="Uploaded image" style="max-width: 100%; height: auto; margin: 10px 0;" />`;
      execCommand('insertHTML', img);
      
      toast({
        title: 'Image uploaded',
        description: 'Image has been added to your content',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'Failed to upload image',
        status: 'error',
        duration: 3000,
      });
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const insertLink = () => {
    if (linkUrl && linkText) {
      const link = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
      execCommand('insertHTML', link);
      setLinkUrl('');
      setLinkText('');
      onClose();
    }
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const toolbarButtons = [
    { icon: FaBold, command: 'bold', tooltip: 'Bold' },
    { icon: FaItalic, command: 'italic', tooltip: 'Italic' },
    { icon: FaUnderline, command: 'underline', tooltip: 'Underline' },
    { icon: FaListUl, command: 'insertUnorderedList', tooltip: 'Bullet List' },
    { icon: FaListOl, command: 'insertOrderedList', tooltip: 'Numbered List' },
    { icon: FaQuoteLeft, command: 'formatBlock', value: 'blockquote', tooltip: 'Quote' },
    { icon: FaCode, command: 'formatBlock', value: 'pre', tooltip: 'Code Block' },
    { icon: FaAlignLeft, command: 'justifyLeft', tooltip: 'Align Left' },
    { icon: FaAlignCenter, command: 'justifyCenter', tooltip: 'Align Center' },
    { icon: FaAlignRight, command: 'justifyRight', tooltip: 'Align Right' },
  ];

  return (
    <VStack spacing={0} align="stretch" border="1px" borderColor="gray.200" borderRadius="md">
      {/* Toolbar */}
      <Flex
        p={2}
        bg="gray.50"
        borderBottom="1px"
        borderColor="gray.200"
        wrap="wrap"
        gap={1}
      >
        {toolbarButtons.map((button, index) => (
          <Tooltip key={index} label={button.tooltip}>
            <IconButton
              aria-label={button.tooltip}
              icon={<button.icon />}
              size="sm"
              variant="ghost"
              onClick={() => execCommand(button.command, button.value)}
            />
          </Tooltip>
        ))}
        
        <Tooltip label="Insert Link">
          <IconButton
            aria-label="Insert Link"
            icon={<FaLink />}
            size="sm"
            variant="ghost"
            onClick={onOpen}
          />
        </Tooltip>
        
        <Tooltip label="Insert Image">
          <IconButton
            aria-label="Insert Image"
            icon={<FaImage />}
            size="sm"
            variant="ghost"
            onClick={() => fileInputRef.current?.click()}
          />
        </Tooltip>
      </Flex>

      {/* Editor */}
      <Box
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        p={4}
        minH={height}
        bg="white"
        outline="none"
        onInput={handleContentChange}
        dangerouslySetInnerHTML={{ __html: value }}
        sx={
          {
            '&:focus': {
              outline: 'none',
            },
            '& blockquote': {
              borderLeft: '4px solid #e2e8f0',
              paddingLeft: '1rem',
              margin: '1rem 0',
              fontStyle: 'italic',
            },
            '& pre': {
              backgroundColor: '#f7fafc',
              padding: '1rem',
              borderRadius: '0.375rem',
              overflow: 'auto',
              fontFamily: 'monospace',
            },
            '& img': {
              maxWidth: '100%',
              height: 'auto',
              margin: '10px 0',
            },
            '& a': {
              color: '#3182ce',
              textDecoration: 'underline',
            },
          } as any
        }
      />

      {/* Hidden file input */}
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        display="none"
        onChange={handleImageUpload}
      />

      {/* Link Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Insert Link</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Box w="100%">
                <Text mb={2}>Link Text</Text>
                <Input
                  placeholder="Enter link text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                />
              </Box>
              <Box w="100%">
                <Text mb={2}>URL</Text>
                <Input
                  placeholder="https://example.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                />
              </Box>
              <HStack spacing={3} w="100%" justify="flex-end">
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  bg="var(--peach)"
                  color="white"
                  _hover={{ bg: "#c55a65" }}
                  onClick={insertLink}
                  isDisabled={!linkUrl || !linkText}
                >
                  Insert Link
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default RichTextEditor;