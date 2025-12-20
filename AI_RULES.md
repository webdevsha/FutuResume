# AI Rules

## Tech Stack

*   **Frontend**: React 18 + TypeScript + Vite.
*   **Styling**: Tailwind CSS + Shadcn/UI (Radix UI primitives).
*   **Routing**: Wouter.
*   **State Management**: TanStack Query (React Query).
*   **Backend**: Node.js + Express.js.
*   **Database**: PostgreSQL + Drizzle ORM.
*   **AI Service**: Google Gemini (via `@google/genai`).
*   **Validation**: Zod (Shared schemas).
*   **Icons**: Lucide React.
*   **File Handling**: Multer + pdf-parse.

## Library Usage Rules

*   **Routing**: Always use `wouter` for client-side routing. Do NOT use `react-router-dom`.
*   **Styling**: Use Tailwind CSS utility classes. Prefer Shadcn/UI components located in `client/src/components/ui`.
*   **Icons**: Use `lucide-react` for all icons.
*   **Data Fetching**: Use `@tanstack/react-query` hooks (`useQuery`, `useMutation`) for all server state. Use the `queryClient` and `apiRequest` utilities from `client/src/lib/queryClient.ts`.
*   **Forms**: Use `react-hook-form` combined with `zod` resolvers.
*   **Database**: Use `drizzle-orm` for all database operations. Define schemas in `shared/schema.ts` to share types between client and server.
*   **AI**: Use the `GoogleGenAI` SDK for AI operations. Do NOT introduce OpenAI unless specifically requested.
*   **File Uploads**: Use `react-dropzone` on the frontend and `multer` on the backend.