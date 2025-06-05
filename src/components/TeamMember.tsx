interface TeamMemberProps {
  name: string;
  role?: string;
  image: string;
}

const TeamMember = ({ name, role, image }: TeamMemberProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4 border-4 border-green-500">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      {role && <p className="text-sm text-gray-600">{role}</p>}
    </div>
  );
};

export default TeamMember;