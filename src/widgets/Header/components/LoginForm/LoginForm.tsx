
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useLoginMutation } from "@/modules/auth/model/hooks/useLoginMutation"
import { Button } from "@/shared/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import { Loader } from "@/shared/ui/loader"
import { toast } from "sonner"

const loginSchema = z.object({
  email: z.string().email({
    message: "Поле должно быть имейлом, например 222@gmail.com",
  }),
  password: z.string().min(2, {
    message: "Пароль должен быть длиннее 2 символов",
  }),
})

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const { mutate, isPending } = useLoginMutation()
  const [isVisible, setIsVisible] = useState(false)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    mutate(data, {
      onSuccess: () => {
        form.reset()
        toast.success("Успешный вход")
        onSuccess?.()
      },
      onError: (error) => {
        toast.error("Ошибка входа", { description: error.response?.data.detail })
      },
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Введите Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={isVisible ? "text" : "password"}
                    placeholder="Введите пароль"
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2.5"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? <Loader className="w-4 h-4" /> : "Войти"}
        </Button>
      </form>
    </Form>
  )
}