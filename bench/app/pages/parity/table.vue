<template>
  <div class="p-4 space-y-4">
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UTable loading loading-color="primary" :data="[{ name: 'Ada Lovelace', role: 'Engineer', status: 'active' }, { name: 'Grace Hopper', role: 'Engineer', status: 'active' }, { name: 'Alan Turing', role: 'Engineer', status: 'active' }, { name: 'Linus Torvalds', role: 'Engineer', status: 'active' }, { name: 'Margaret Hamilton', role: 'Engineer', status: 'active' }]" /></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UTable loading loading-color="secondary" :data="[{ name: 'Ada Lovelace', role: 'Engineer', status: 'active' }, { name: 'Grace Hopper', role: 'Engineer', status: 'active' }, { name: 'Alan Turing', role: 'Engineer', status: 'active' }, { name: 'Linus Torvalds', role: 'Engineer', status: 'active' }, { name: 'Margaret Hamilton', role: 'Engineer', status: 'active' }]" /></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UTable loading loading-color="success" :data="[{ name: 'Ada Lovelace', role: 'Engineer', status: 'active' }, { name: 'Grace Hopper', role: 'Engineer', status: 'active' }, { name: 'Alan Turing', role: 'Engineer', status: 'active' }, { name: 'Linus Torvalds', role: 'Engineer', status: 'active' }, { name: 'Margaret Hamilton', role: 'Engineer', status: 'active' }]" /></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UTable loading loading-color="info" :data="[{ name: 'Ada Lovelace', role: 'Engineer', status: 'active' }, { name: 'Grace Hopper', role: 'Engineer', status: 'active' }, { name: 'Alan Turing', role: 'Engineer', status: 'active' }, { name: 'Linus Torvalds', role: 'Engineer', status: 'active' }, { name: 'Margaret Hamilton', role: 'Engineer', status: 'active' }]" /></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UTable loading loading-color="warning" :data="[{ name: 'Ada Lovelace', role: 'Engineer', status: 'active' }, { name: 'Grace Hopper', role: 'Engineer', status: 'active' }, { name: 'Alan Turing', role: 'Engineer', status: 'active' }, { name: 'Linus Torvalds', role: 'Engineer', status: 'active' }, { name: 'Margaret Hamilton', role: 'Engineer', status: 'active' }]" /></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UTable loading loading-color="error" :data="[{ name: 'Ada Lovelace', role: 'Engineer', status: 'active' }, { name: 'Grace Hopper', role: 'Engineer', status: 'active' }, { name: 'Alan Turing', role: 'Engineer', status: 'active' }, { name: 'Linus Torvalds', role: 'Engineer', status: 'active' }, { name: 'Margaret Hamilton', role: 'Engineer', status: 'active' }]" /></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UTable loading loading-color="neutral" :data="[{ name: 'Ada Lovelace', role: 'Engineer', status: 'active' }, { name: 'Grace Hopper', role: 'Engineer', status: 'active' }, { name: 'Alan Turing', role: 'Engineer', status: 'active' }, { name: 'Linus Torvalds', role: 'Engineer', status: 'active' }, { name: 'Margaret Hamilton', role: 'Engineer', status: 'active' }]" /></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UTable loading :data="[{ name: 'Ada Lovelace', role: 'Engineer', status: 'active' }, { name: 'Grace Hopper', role: 'Engineer', status: 'active' }, { name: 'Alan Turing', role: 'Engineer', status: 'active' }, { name: 'Linus Torvalds', role: 'Engineer', status: 'active' }, { name: 'Margaret Hamilton', role: 'Engineer', status: 'active' }]" /></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UTable :data="[{ name: 'Ada Lovelace', role: 'Engineer', status: 'active' }, { name: 'Grace Hopper', role: 'Engineer', status: 'active' }, { name: 'Alan Turing', role: 'Engineer', status: 'active' }, { name: 'Linus Torvalds', role: 'Engineer', status: 'active' }, { name: 'Margaret Hamilton', role: 'Engineer', status: 'active' }]" /></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UTable caption="Title" :data="[{ name: 'Ada Lovelace', role: 'Engineer', status: 'active' }, { name: 'Grace Hopper', role: 'Engineer', status: 'active' }, { name: 'Alan Turing', role: 'Engineer', status: 'active' }, { name: 'Linus Torvalds', role: 'Engineer', status: 'active' }, { name: 'Margaret Hamilton', role: 'Engineer', status: 'active' }]" /></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UTable :data="[]" /></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UTable sticky :data="[{ name: 'Ada Lovelace', role: 'Engineer', status: 'active' }, { name: 'Grace Hopper', role: 'Engineer', status: 'active' }, { name: 'Alan Turing', role: 'Engineer', status: 'active' }, { name: 'Linus Torvalds', role: 'Engineer', status: 'active' }, { name: 'Margaret Hamilton', role: 'Engineer', status: 'active' }]" /></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UTable sticky="header" :data="[{ name: 'Ada Lovelace', role: 'Engineer', status: 'active' }, { name: 'Grace Hopper', role: 'Engineer', status: 'active' }, { name: 'Alan Turing', role: 'Engineer', status: 'active' }, { name: 'Linus Torvalds', role: 'Engineer', status: 'active' }, { name: 'Margaret Hamilton', role: 'Engineer', status: 'active' }]" /></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UTable sticky="footer" :data="[{ name: 'Ada Lovelace', role: 'Engineer', status: 'active' }, { name: 'Grace Hopper', role: 'Engineer', status: 'active' }, { name: 'Alan Turing', role: 'Engineer', status: 'active' }, { name: 'Linus Torvalds', role: 'Engineer', status: 'active' }, { name: 'Margaret Hamilton', role: 'Engineer', status: 'active' }]" :columns="[{ accessorKey: 'name', header: 'Name', footer: 'Name' }, { accessorKey: 'role', header: 'Role', footer: 'Role' }, { accessorKey: 'status', header: 'Status', footer: 'Status' }]" /></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UTable :data="[{ name: 'Ada Lovelace', role: 'Engineer', status: 'active' }, { name: 'Grace Hopper', role: 'Engineer', status: 'active' }, { name: 'Alan Turing', role: 'Engineer', status: 'active' }, { name: 'Linus Torvalds', role: 'Engineer', status: 'active' }, { name: 'Margaret Hamilton', role: 'Engineer', status: 'active' }]" :column-pinning="{ left: ['name'] }" /></div>
    </div>
  </div>
</template>
