import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'

export async function PATCH(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    if (!params.companionId) {
      return new NextResponse('Companion ID required', { status: 400 })
    }

    const body = await req.json()
    const user = await currentUser()

    const { name, description, src, seed, instructions, categoryId } = body

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (
      !name ||
      !description ||
      !src ||
      !seed ||
      !instructions ||
      !categoryId
    ) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    // TODO : Check for subscription

    const companion = await prismadb.companion.update({
      where: {
        id: params.companionId,
      },
      data: {
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
        categoryId,
      },
    })

    return NextResponse.json(companion)
  } catch (error) {
    console.log('[COMPANION_PATCH', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
