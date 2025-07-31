'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { authenticateWithUsernameAndPasswordAction } from '@/actions/auth/autenticate-with-username-and-password'
import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui'

export function SignInForm() {
  const t = useTranslations('Components.SignInForm')

  const authenticateAction = useAction(
    authenticateWithUsernameAndPasswordAction,
    {
      onSuccess: ({ data }) => {

        if (data?.invalidCredentials) {
          toast.error(t('error-message'))
        }
      },
    }
  )

  const authenticateSchema = z.object({
    username: z.string().min(1, { message: t('email-error') }),
    password: z.string().min(3, { message: t('password-error') }),
  })

  type AuthenticateFormValues = z.infer<typeof authenticateSchema>

  const signInForm = useForm<AuthenticateFormValues>({
    resolver: zodResolver(authenticateSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = signInForm

  return (
    <Form {...signInForm}>
      <form onSubmit={handleSubmit(authenticateAction.execute)}>
        <div className="space-y-8">
          <FormField
            control={control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>{t('email-label')}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t('email-placeholder')}
                    className="h-14"
                    autoComplete="off"
                    autoCapitalize="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>{t('password-label')}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t('password-placeholder')}
                    className="h-14"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="mt-20 h-14 w-full font-semibold"
          disabled={isSubmitting}
        >
          {t('button-sign-in')}
        </Button>
      </form>
    </Form>
  )
}
