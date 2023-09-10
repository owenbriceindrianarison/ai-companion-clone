import prismadb from '@/lib/prismadb'
import { CompanionForm } from '../components/companion-form'

interface CompanioIdPageProps {
  params: {
    companionId: string
  }
}

export default async function CompanionIdPage({ params }: CompanioIdPageProps) {
  const companion =
    params.companionId !== 'new'
      ? await prismadb.companion.findUnique({
          where: {
            id: params.companionId,
          },
        })
      : null

  const categories = await prismadb.category.findMany()

  return <CompanionForm initialData={companion} categories={categories} />
}
