// import { Badge } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { Badge } from './ui/badge';
// import { Badge } from 'src/components/ui/badge.jsx'
import React from 'react'

function LatestJobCard({job}) {
    const navigate=useNavigate();
    return (
        <div
      onClick={() => navigate(`description/${job._id}`)}
      className="p-6 rounded-xl shadow-md border border-gray-200 bg-white transition-transform hover:scale-[1.02] cursor-pointer hover:shadow-xl"
    >
      <div className="mb-2">
        <h1 className="text-gray-800 font-semibold text-lg">{job?.company?.name}</h1>
        <p className="text-xs text-gray-400">India</p>
      </div>

      <div className="my-3">
        <h2 className="text-xl font-bold text-[#1e1e1e] mb-1 capitalize">{job?.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full shadow-sm">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-red-100 text-[#F83002] font-semibold px-3 py-1 rounded-full shadow-sm">
          {job?.jobType}
        </Badge>
        <Badge className="bg-purple-100 text-[#7209b7] font-semibold px-3 py-1 rounded-full shadow-sm">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
    )
}

export default LatestJobCard
