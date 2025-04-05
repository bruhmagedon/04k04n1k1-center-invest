import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import mammoth from 'mammoth';
import { toast } from 'sonner';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { AllDialog } from '@/widgets/AuthDialog/OurDialog';
import { SquarePlus, Upload } from 'lucide-react';

const FormSchema = z.object({
  title: z.string().min(3, 'Название должно содержать минимум 3 символа'),
  link: z.string().min(3,'Ссылка должна содержать минимум 3 символа')
});

type FormValues = z.infer<typeof FormSchema> & {
  fileContent?: string;
};

export function NpaCreateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      link: ''
    }
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setFileName(file.name);
      
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      setFileContent(result.value);
      
      toast.success('Файл успешно загружен');
    } catch (error) {
      console.error('Ошибка при обработке файла:', error);
      toast.error('Ошибка при обработке файла');
      setFileName(null);
      setFileContent(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    if (!fileContent) {
      toast.error('Необходимо загрузить файл');
      return;
    }

    const formData: FormValues = {
      ...data,
      fileContent
    };

    // Here you would send the data to your backend
    console.log('Submitting NPA data:', formData);
    
    toast.success('НПА успешно создан');
    setIsOpen(false);
    form.reset();
    setFileName(null);
    setFileContent(null);
  };

  return (
    <AllDialog 
      triggerText="Создать НПА" 
      title="Создание нового НПА" 
      isOpen={isOpen} 
      setIsOpen={setIsOpen}
      triggerIcon={<SquarePlus size={16} />}
    >
      <div className="max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название НПА</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите название НПА" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Документ НПА</FormLabel>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept=".docx"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Button
                    type="button"
                    prefix={  <Upload className="mr-2 h-4 w-4" />}
                    onClick={() => document.getElementById('file-upload')?.click()}
                    className="w-full flex"
                    disabled={isUploading}
                  >
                  
                    {isUploading ? 'Загрузка...' : 'Загрузить документ'}
                  </Button>
                </div>
                {fileName && (
                  <div className="text-sm text-muted-foreground bg-muted/30 p-2 rounded">
                    Загружен файл: {fileName}
                  </div>
                )}
              </div>
            </div>

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ссылка на НПА</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/npa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full mt-6"
              disabled={isUploading || !fileContent}
              
            >
              Создать НПА
            </Button>
          </form>
        </Form>
      </div>
    </AllDialog>
  );
}