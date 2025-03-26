import Block from '@/modules/common/components/shared/block';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaWpforms, FaUsers, FaCheckCircle, FaClock } from 'react-icons/fa';

const submissionData = [
    { name: 'Mon', submissions: 40 },
    { name: 'Tue', submissions: 30 },
    { name: 'Wed', submissions: 45 },
    { name: 'Thu', submissions: 25 },
    { name: 'Fri', submissions: 55 },
    { name: 'Sat', submissions: 20 },
    { name: 'Sun', submissions: 15 },
];

export default function Index() {
    return (
        <div className="grid md:grid-rows-[2fr_5fr_5fr] grid-rows-[4fr_8fr]  gap-4 h-full">
            <div className="grid md:grid-cols-[1fr_1fr_1fr_1fr] grid-cols-[1fr_1fr]  gap-4">
                <Block>
                    <div className="grid grid-cols-[2fr_1fr] h-full content-center">
                        <div className="grid content-center gap-1">
                            <span className="text-gray-500 text-sm">总表单数</span>
                            <span className="text-2xl font-bold">124</span>
                            <span className="text-green-500 text-xs">↑ 12% 较上周</span>
                        </div>
                        <FaWpforms className="text-blue-500 text-3xl place-self-center" />
                    </div>
                </Block>
                <Block>
                    <div className="grid grid-cols-[2fr_1fr] h-full content-center">
                        <div className="grid content-center gap-1">
                            <span className="text-gray-500 text-sm">活跃用户</span>
                            <span className="text-2xl font-bold">1,893</span>
                            <span className="text-green-500 text-xs">↑ 8% 较上周</span>
                        </div>
                        <FaUsers className="text-purple-500 text-3xl place-self-center" />
                    </div>
                </Block>
                <Block>
                    <div className="grid grid-cols-[2fr_1fr] h-full content-center">
                        <div className="grid content-center gap-1">
                            <span className="text-gray-500 text-sm">提交次数</span>
                            <span className="text-2xl font-bold">8,942</span>
                            <span className="text-green-500 text-xs">↑ 23% 较上周</span>
                        </div>
                        <FaCheckCircle className="text-green-500 text-3xl place-self-center" />
                    </div>
                </Block>
                <Block>
                    <div className="grid grid-cols-[2fr_1fr] h-full content-center">
                        <div className="grid content-center gap-1">
                            <span className="text-gray-500 text-sm">平均完成时间</span>
                            <span className="text-2xl font-bold">2.5分钟</span>
                            <span className="text-red-500 text-xs">↓ 5% 较上周</span>
                        </div>
                        <FaClock className="text-orange-500 text-3xl place-self-center" />
                    </div>
                </Block>
            </div>
            <div className="grid md:grid-cols-[1fr_1fr] grid-cols-[1fr] gap-4">
                <Block>
                    <div className="grid grid-rows-[auto_1fr] h-full">
                        <h3 className="text-lg font-semibold">每日提交统计</h3>
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={submissionData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="submissions" fill="#4F46E5" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </Block>
                <Block>
                    <div className="grid grid-rows-[auto_1fr] h-full">
                        <h3 className="text-lg font-semibold">热门表单类型</h3>
                        <div className="grid grid-rows-3 content-center gap-4">
                            {[
                                { name: '调查问卷', value: 70, color: 'bg-blue-600' },
                                { name: '注册表单', value: 55, color: 'bg-purple-600' },
                                { name: '反馈表单', value: 40, color: 'bg-green-600' }
                            ].map((item, index) => (
                                <div key={index} className="grid grid-cols-[1fr_auto] gap-4 items-center">
                                    <div className="grid gap-1">
                                        <span className="text-sm text-gray-600">{item.name}</span>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.value}%` }}></div>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Block>
            </div>
            <div className="grid md:grid-cols-[1fr_1fr] grid-cols-[1fr] gap-4">
                <Block>
                    <div className="grid grid-rows-[auto_1fr] h-full">
                        <h3 className="text-lg font-semibold">最近活动</h3>
                        <div className="grid grid-rows-4 content-center gap-4">
                            {[
                                { user: "张三", action: "创建了新表单", time: "2分钟前" },
                                { user: "李四", action: "提交了问卷调查", time: "5分钟前" },
                                { user: "王五", action: "编辑了注册表单", time: "15分钟前" },
                                { user: "赵六", action: "删除了旧表单", time: "1小时前" }
                            ].map((activity, index) => (
                                <div key={index} className="grid grid-cols-[auto_1fr_auto] gap-3 items-center">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 grid place-items-center">
                                        {activity.user.charAt(0)}
                                    </div>
                                    <div className="grid content-center gap-0.5">
                                        <span className="text-sm font-medium">{activity.user}</span>
                                        <span className="text-sm text-gray-500">{activity.action}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Block>
                <Block>
                    <div className="grid grid-rows-[auto_1fr] h-full">
                        <h3 className="text-lg font-semibold">系统性能</h3>
                        <div className="grid grid-rows-3 content-center gap-6">
                            {[
                                { name: 'API响应时间', value: '234ms', percent: 85, color: 'bg-green-600' },
                                { name: '表单加载速度', value: '1.2s', percent: 75, color: 'bg-yellow-600' },
                                { name: '系统可用性', value: '99.9%', percent: 99.9, color: 'bg-blue-600' }
                            ].map((item, index) => (
                                <div key={index} className="grid gap-1">
                                    <div className="grid grid-cols-[1fr_auto]">
                                        <span className="text-sm font-medium">{item.name}</span>
                                        <span className="text-sm text-gray-500">{item.value}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percent}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Block>
            </div>
        </div>
    );
}