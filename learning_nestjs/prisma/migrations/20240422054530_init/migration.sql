-- CreateTable
CREATE TABLE "Roles" (
    "roleId" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("roleId")
);

-- CreateTable
CREATE TABLE "Authorizaton" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "Authorizaton_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Roles_role_key" ON "Roles"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Authorizaton_id_key" ON "Authorizaton"("id");

-- AddForeignKey
ALTER TABLE "Authorizaton" ADD CONSTRAINT "Authorizaton_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;
