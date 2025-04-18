// pages/objectives.tsx
import React from "react";
import Objective from "@/components/listing/Objective";
import MainLayout from "@/components/layouts/MainLayout"; // optional layout

const ObjectivesPage = () => {
  return (
    <MainLayout> {/* optional layout wrapper */}
      <Objective />
    </MainLayout>
  );
};

export default ObjectivesPage;
