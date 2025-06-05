interface TaskCardProps {
  image: string;
  title: string;
  description: string;
}

const TaskCard = ({ image, title, description }: TaskCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="sm:flex flex-col md:flex-row">
        {/* Image */}
        <div className="sm:w-full md:w-1/3 h-48 md:h-auto">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="p-6 sm:w-full md:w-2/3">
          <h3 className="text-xl font-bold text-green-800 mb-3">{title}</h3>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;