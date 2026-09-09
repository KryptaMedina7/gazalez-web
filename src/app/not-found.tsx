import { ButtonLink } from "@/components/shared";
export default function NotFound() {
  return (
    <div className="not-found">
      <span>404</span>
      <h1>Este camino no está disponible.</h1>
      <p>Puedes volver al inicio o explorar nuestras soluciones.</p>
      <ButtonLink href="/">Volver a GAZALEZ</ButtonLink>
    </div>
  );
}
