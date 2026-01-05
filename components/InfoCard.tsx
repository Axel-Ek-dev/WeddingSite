export default function InfoCard({ title, description, icon }: { title: string; description: React.ReactNode; icon: React.ReactNode }){
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-start space-x-4">
      <div className="text-2xl text-forest">{icon}</div>
      <div>
        <h3 className="font-semibold text-near-black">{title}</h3>
        <div className="text-sm text-muted mt-1">{description}</div>
      </div>
    </div>
  )
}
