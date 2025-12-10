import { improveWithAi } from '@/actions/resume'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import useFetch from '@/hooks/use-fetch'
import { entrySchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns/format'
import { parse } from 'date-fns/parse'
import { Loader2, Sparkles, X } from 'lucide-react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const EntryForm = ({ type, entries, onChange }) => {

  const [isAdding, setIsAdding] = React.useState(false)

  const {
    register,
    handleSubmit: handleValidation,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    }
  })

  const current = watch("current")

  const {
    loading,
    fn: improveWithAiFn,
    data: improvedContent,
    error: improveError

  } = useFetch(improveWithAi)

  const formatDisplayDate  = (dataString) => {
    if (!dataString ) return ""
    const data = parse(dataString , "yyyy-MM-dd" , new Date())
    return format(data , "LLL dd, yyyy")
  }
  
  const handleAdd = handleValidation((data) => {
    const formattedEntry = {
      ...data ,
      startDate : formatDisplayDate(data.startDate) ,
      endDate : data.current ? "" : formatDisplayDate(data.endDate)
    }
    onChange([...entries , formattedEntry])
    reset()
    setIsAdding(false)
  })
  const handleDelete = (index) => { 
    const newEntries = entries.filter((_, i ) => i !== index);
    onChange(newEntries)
  }


  useEffect(() => {
      if(improvedContent && !loading ){
        setValue("description" , improvedContent)
        toast.success("Improved description")
      }
      if(improveError && !loading ){
        toast.error("Failed to improve description")
      }
  } , [improvedContent ,improveError , loading ])


  const handleImproveDescription = async () => {
    console.log("inside handle deccroption")
    const description = watch("description")

    if (!description) {
      toast.error("Please enter a description")
      return
    }

    await improveWithAiFn({
      current: description,
      type: type.toLowerCase()
    })
  }

  return (
    <div className='space-y-4'>

      <div className='space-y-4'>
        {
          entries.map((item  , index ) => {
            return (
              <Card key={index}>
                <CardHeader className={`flex flex-row items-center justify-between space-y-1 pb-2`}>
                  <CardTitle
                    className={`text-sm font-medium`}
                  >{item.title} @ {item.organization}
                  </CardTitle>

                  <Button 
                    variant={"outline"}
                    size={"sm"}
                    type={"button"}
                    onClick={() => handleDelete(index)}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </CardHeader>

                <CardContent className={`space-y-4`}>
                    <p  className='text-sm text-muted-foreground'>
                      {item.current ? `${item.startDate} - ${item.endDate}` : item.startDate}
                    </p>
                    <p
                      className='mt-2 text-sm whitespace-pre-wrap'
                    >{item.description}</p>
                </CardContent>
              </Card>
            )
          })
        }
      </div>
      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>Add {type}</CardTitle>
          </CardHeader>

          <CardContent className={`space-y-4`}>
            <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 lg:w-full gap-4'>
              <div>
                <Input {...register("title")}
                  errors={errors.title}
                  placeholder="Title"
                  type={"text"}
                />
                {errors.title && (
                  <p className='text-sm text-red-700'>{errors.title?.message}</p>
                )}

              </div>

              <div>
                <Input {...register("organization")}
                  errors={errors.title}
                  placeholder="Organization name"
                  type={"text"}
                />
                {errors.title && (
                  <p className='text-sm text-red-700'>{errors.organization?.message}</p>
                )}

              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='space-y-4'>
                <Input {...register("startDate")}
                  errors={errors.startDate}
                  placeholder="Start Date"
                  type={"date"}
                />
                {errors.startDate && (
                  <p className='text-sm text-red-700'>{errors.startDate?.message}</p>
                )}
              </div>
              <div className='space-y-4'>
                <Input
                  disabled={current}
                  {...register("endDate")}
                  errors={errors.endDate}
                  placeholder="End Date"
                  type={"date"}
                />
                {errors.endDate && (
                  <p className='text-sm text-red-700'>{errors.endDate?.message}</p>
                )}
              </div>
            </div>

            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                id='current'
                {...register("current")}
                onChange={(e) => {
                  setValue("current", e.target.checked);
                  if (e.target.checked) {
                    setValue("endDate", "")
                  }
                }}
              />
              <label htmlFor='current'>Current {type}</label>
            </div>

            <div className='space-y-2'>
              <Textarea
                placeholder={`Description of your ${type}`}
                className={`h-32`}
                {...register("description")}
                errors={errors.description}
              />
              <Button
                type="button"
                variant={`ghost`}
                size={`sm`}
                onClick={handleImproveDescription}
                disabled={loading}
              >
                {loading ? (<>
                  <Loader2 className='h-4 w-4 mr-2' />
                  Improving...
                </>) : (<>
                  <Sparkles className='h-4 w-4 mr-2 ' />Improve with AI </>)}
              </ Button>


              {errors.description && (
                <p className='text-sm text-red-700'>{errors.description?.message}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className={`flex justify-end space-x-2`}>
            <Button
              variant={"outline"}
              onClick={() =>{
                reset() ;
                setIsAdding(true)}}
            >Cancel {type}</Button>

            <Button
              variant={"outline"}
              onClick={handleAdd}
            >Add {type}</Button>
          </CardFooter>

        </Card>
      )}
      {!isAdding && (
        <Button
          className={`w-full`}
          variant={"outline"}
          onClick={() => setIsAdding(true)}
        >Add {type}</Button>
      )}
    </div>
  )
}

export default EntryForm
