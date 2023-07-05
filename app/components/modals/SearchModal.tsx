'use client'

import useSearchModal from '@/app/hooks/useSearchModal'
import Modal from './Modal'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect'
import qs from 'query-string'
import { formatISO } from 'date-fns'
import Heading from '../core/Heading'
import Calendar from '../inputs/Calendar'
import Counter from '../inputs/Counter'

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const searchModel = useSearchModal()
  const router = useRouter()
  const params = useSearchParams()

  const [location, setLocation] = useState<CountrySelectValue>()
  const [step, setStep] = useState(STEPS.LOCATION)
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })

  const Map = useMemo(() => dynamic(() => import('../core/Map'), { ssr: false }), [location])

  const onBack = () => setStep(step => step - 1)
  const onNext = () => setStep(step => step + 1)

  const onSubmit = async () => {
    if (step !== STEPS.INFO) return onNext()

    let currentQuery = {}

    if (params) currentQuery = qs.parse(params.toString())

    const updatedQuery: any = { ...currentQuery, locationValue: location?.value, guestCount, roomCount, bathroomCount }

    if (dateRange.startDate) updatedQuery.startDate = formatISO(dateRange.startDate)
    if (dateRange.endDate) updatedQuery.endDate = formatISO(dateRange.endDate)

    const url = qs.stringifyUrl({ url: '/', query: updatedQuery }, { skipNull: true })

    setStep(STEPS.LOCATION)
    searchModel.onClose()
    router.push(url)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) return 'Search'

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) return

    return 'Back'
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Where do you wanna go?" subtitle="Find the perfect location" />
      <CountrySelect value={location} onChange={value => setLocation(value as CountrySelectValue)} />

      <hr />

      <Map center={location?.latlng} />
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="When do you plan to go?" subtitle="Make sure everyone is free." />
        <Calendar value={dateRange} onChange={value => setDateRange(value.selection)} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place." />
        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={value => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={value => setRoomCount(value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={value => setBathroomCount(value)}
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={searchModel.isOpen}
      onClose={searchModel.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      body={bodyContent}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
    />
  )
}

export default SearchModal
