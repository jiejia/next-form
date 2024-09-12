export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* 这里可以添加 dashboard 特定的导航或其他元素 */}
      <nav className="bg-gray-100 p-4">
        <h2 className="text-xl font-bold">Dashboard Navigation</h2>
      </nav>
      {children}
    </section>
  )
}
