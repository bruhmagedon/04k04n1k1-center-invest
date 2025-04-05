import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import mammoth from 'mammoth';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { AllDialog } from '@/widgets/AuthDialog/OurDialog';
import { BookPlus, Upload } from 'lucide-react';
import { useCreateNpaMutation } from '@/modules/npa/model/hooks/useCreateNpaMutation';
import { useTokenStore } from '@/modules/auth/model/store/authStore';
import { useProfileUser } from '@/shared/hooks/useProfileUser';

const FormSchema = z.object({
  title: z.string().min(3, 'Название должно содержать минимум 3 символа'),
  link: z.string().min(3, 'Ссылка должна содержать минимум 3 символа').optional()
});

type FormValues = z.infer<typeof FormSchema>;

export function NpaCreateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileObject, setFileObject] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const { accessToken } = useTokenStore();
  const { isAuthorized } = useProfileUser();

  const { mutate, isPending } = useCreateNpaMutation();

  const form = useForm<FormValues>({
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
      const text = result.value;
      setExtractedText(text);

      const textBlob = new Blob([text], { type: 'text/plain' });
      const textFile = new File([textBlob], `${file.name.split('.')[0]}.txt`, { type: 'text/plain' });
      setFileObject(textFile);
      console.log(textFile);
      toast.success('Файл успешно загружен и преобразован в текст');
    } catch (error) {
      console.error('Ошибка при обработке файла:', error);
      toast.error('Ошибка при обработке файла');
      setFileName(null);
      setFileObject(null);
      setExtractedText(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (data: FormValues) => {
    if (!fileObject || !extractedText) {
      toast.error('Необходимо загрузить файл');
      return;
    }

    if (!accessToken) {
      toast.error('Необходимо авторизоваться');
      return;
    }

    const formData = new FormData();
    formData.append('name', data.title);
    formData.append('file', fileObject);
    formData.append('source', 'user');

    if (data.link) {
      formData.append('link', data.link);
    }

    mutate(formData, {
      onSuccess: () => {
        toast.success('НПА успешно создан');
        setIsOpen(false);
        form.reset();
        setFileName(null);
        setFileObject(null);
        setExtractedText(null);
      },
      onError: (error) => {
        console.log(fileObject);
        toast.error('Ошибка при создании НПА', {
          description: error.response?.data?.detail || 'Проверьте введенные данные'
        });
      }
    });
  };

  return (
    <>
      {isAuthorized && (
        <AllDialog
          triggerText='Создать НПА'
          title='Создание нового НПА'
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          triggerIcon={<BookPlus size={16} />}
        >
          <div className='max-w-md h-full relative'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 h-full flex flex-col'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название НПА</FormLabel>
                      <FormControl>
                        <Input placeholder='Введите название НПА' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='space-y-2'>
                  <FormLabel>Документ НПА</FormLabel>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'>
                      <Input
                        type='file'
                        accept='.docx'
                        id='file-upload'
                        className='hidden'
                        onChange={handleFileChange}
                      />
                      <Button
                        type='button'
                        prefix={<Upload className='mr-2 h-4 w-4' />}
                        onClick={() => document.getElementById('file-upload')?.click()}
                        className='w-full flex'
                        disabled={isUploading}
                      >
                        {isUploading ? 'Загрузка...' : 'Загрузить документ'}
                      </Button>
                    </div>
                    {fileName && (
                      <div className='text-sm text-muted-foreground bg-muted/30 p-2 rounded'>
                        Загружен файл: {fileName}
                        {extractedText && <div className='mt-1 text-xs'>Преобразован в текстовый формат</div>}
                      </div>
                    )}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name='link'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ссылка на НПА</FormLabel>
                      <FormControl>
                        <Input placeholder='https://example.com/npa' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  className='w-full mt-6 bottom-0 absolute'
                  disabled={isUploading || !fileObject || isPending}
                >
                  {isPending ? 'Создание...' : 'Создать НПА'}
                </Button>
              </form>
            </Form>
          </div>
        </AllDialog>
      )}
    </>
  );
}
