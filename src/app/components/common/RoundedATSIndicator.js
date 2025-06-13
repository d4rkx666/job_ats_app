export const RoundedATSIndicador = ({score, className}) => {

   return (
      <div className={className}>
         <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
               d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
               fill="none"
               stroke="#E5E7EB"
               strokeWidth="3"
            />
            <path
               d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
               fill="none"
               stroke={score > 70 ? "#10B981" : score > 40 ? "#F59E0B" : "#EF4444"}
               strokeWidth="3"
               strokeDasharray={`${score}, 100`}
            />
            <text x="18" y="20" textAnchor="middle" fill="#111827" fontSize="10" fontWeight="bold">
               {score}%
            </text>
         </svg>
      </div>
   )
}