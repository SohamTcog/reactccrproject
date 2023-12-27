import React, { useState } from "react";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Button, ToggleButton } from "@mui/material";

interface ToggleButtonProps {
  onEntityChange: (entity: string) => void;
}
const EntityToggleButton: React.FC<ToggleButtonProps> = ({
  onEntityChange,
}) => {
  const [selectedEntity, setSelectedEntity] = useState<string>("");

  const handleEntityChange = (
    event: React.MouseEvent<HTMLElement>,
    newEntity: string | null
  ) => {
    if (newEntity !== null) {
      setSelectedEntity(newEntity);
      onEntityChange(newEntity);
    }
  };

  return (
    <div>
      <ToggleButtonGroup
        exclusive
        value={selectedEntity}
        onChange={handleEntityChange}
        aria-label="entity options"
      >
        <ToggleButton value={"candidate"}>Candidate</ToggleButton>
        <ToggleButton value={"comrec"}>Company & Recruiter</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default EntityToggleButton;
