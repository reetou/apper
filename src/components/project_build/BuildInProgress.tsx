import PageContainer from "../PageContainer";
import React from "react";
import Title from "../Title";


export default function BuildInProgress() {
  return (
    <PageContainer>
      <Title>Идет сборка...</Title>
      <div style={{ textAlign: 'center' }}>
        После сборки ссылка на приложение появится справа
      </div>
    </PageContainer>
  )
}