import { UploadHub } from './components/UploadHub'

export default function UploadHubPreview() {
  return (
    <UploadHub
      onUploadPhoto={() => {
        console.log('Upload photo')
        alert('Photo picker would open here (camera/file selector)')
      }}
      onAddManually={() => {
        console.log('Add manually')
        alert('Manual add form would open here')
      }}
    />
  )
}
