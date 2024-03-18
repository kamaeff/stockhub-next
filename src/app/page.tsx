import Header from '@/components/header/Header'
import Main from '@/components/main/Main'
import Circles from './ui/Circles'

interface SearchParamProps {
  searchParams: Record<string, string>
}
export default function Home(props: SearchParamProps) {
  return (
    <main>
      <div className='background'>
        <Circles />
      </div>
      <Header searchParams={props.searchParams} />
      <Main searchParams={props.searchParams} />
    </main>
  )
}
