const HospitalMatchCard = ({ name, distance, urgency, needed }) => {
    const urgencyColors = {
      Critical: 'bg-red-100 text-red-800',
      High: 'bg-orange-100 text-orange-800',
      Normal: 'bg-blue-100 text-blue-800'
    };
  
    return (
      <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium">{name}</h4>
          <span className={`px-2 py-1 text-sm rounded-full ${urgencyColors[urgency]}`}>
            {urgency}
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{distance} km</span>
          <span>{needed} units needed</span>
        </div>
      </div>
    );
  };

export default HospitalMatchCard;