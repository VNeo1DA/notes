import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getNoteById } from "../../services/notes"
import { toggleNoteImportance } from "../../actions/notes"

type Props = { params: Promise<{ id: string }> }

export default function NotePage({ params }: Props) {
  return (
    <Suspense fallback={<p>Loading note...</p>}>
      <NoteContent params={params} />
    </Suspense>
  )
}

async function NoteContent({ params }: Props) {
  const { id } = await params
  const note = getNoteById(Number(id))

  if (!note) notFound()

  return (
    <div>
      <h2>{note.content}</h2>
      <p>{note.important ? "Important" : "Not important"}</p>
      <form action={toggleNoteImportance}>
        <input type="hidden" name="id" value={note.id} />
        <button type="submit">
          {note.important ? "Mark as not important" : "Mark as important"}
        </button>
      </form>
    </div>
  )
}