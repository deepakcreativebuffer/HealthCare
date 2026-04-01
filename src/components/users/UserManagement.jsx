import React, { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  Shield,
  Clock,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit3,
  Trash2,
  Mail,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { api } from "../../data/api";
import AddUserModal from "./modals/AddUserModal";
import EditUserModal from "./modals/EditUserModal";
import DeleteConfirmationModal from "./modals/DeleteConfirmationModal";
import UserDetailsView from "./UserDetailsView";
import { Eye } from "lucide-react";

const UserStatCard = ({ label, value, icon: Icon, color }) => {
  const colorMap = {
    blue: "bg-[#ebf5ff] text-[#3182ce] border-[#bee3f8]",
    green: "bg-[#e9f7ef] text-[#27ae60] border-[#d5f1e0]",
    orange: "bg-[#fffaf0] text-[#dd6b20] border-[#feebc8]",
    red: "bg-[#fff5f5] text-[#e53e3e] border-[#fed7d7]",
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all shadow-sm group">
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border ${colorMap[color]}`}
      >
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <div>
        <h4 className="text-2xl font-black text-slate-800 tracking-tight leading-none">
          {value}
        </h4>
        <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-widest">
          {label}
        </p>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({ metrics: [], users: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // "list" or "details"

  // Custom Confirmation Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfig, setDeleteConfig] = useState({
    onConfirm: () => {},
    title: "",
    message: "",
    count: 1,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await api.getUsersData();
      setUserData(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      await api.addUser(newUser);
      fetchUsers();
    } catch (error) {
      alert("Failed to add user");
    }
  };

  const handleUpdateUser = async (updatedData) => {
    try {
      await api.updateUser(selectedUser.id, updatedData);
      fetchUsers();
    } catch (error) {
      alert("Failed to update user");
    }
  };

  const handleDeleteUser = (userToDelete = null) => {
    const targetUser = userToDelete || selectedUser;
    if (!targetUser) return;

    setDeleteConfig({
      onConfirm: async () => {
        try {
          await api.deleteUser(targetUser.id);
          setIsEditModalOpen(false);
          await fetchUsers();
        } catch (error) {
          alert("Failed to delete user");
        }
      },
      title: "Confirm User Deletion",
      message: `Are you sure you want to permanently delete the account for ${targetUser.name}? This action cannot be reversed.`,
      count: 1,
    });
    setIsDeleteModalOpen(true);
  };

  const filteredUsers = userData.users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All Roles" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const [selectedUsers, setSelectedUsers] = useState([]);

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    }
  };

  const toggleSelectUser = (e, id) => {
    e.stopPropagation();
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((uid) => uid !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleBulkDelete = () => {
    setDeleteConfig({
      onConfirm: async () => {
        try {
          await api.deleteUsersBulk(selectedUsers);
          setSelectedUsers([]);
          await fetchUsers();
        } catch (error) {
          alert("Bulk delete failed");
        }
      },
      title: "Bulk Delete Confirmation",
      message: `Are you sure you want to permanently delete these ${selectedUsers.length} user accounts? This cannot be undone.`,
      count: selectedUsers.length,
    });
    setIsDeleteModalOpen(true);
  };

  const iconMap = { Users, UserCheck, Shield, Clock };

  if (loading && !userData.users.length) {
    return (
      <div className="flex-1 flex items-center justify-center p-20">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#129FED] animate-spin mx-auto mb-4" />
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">
            Initializing User Database...
          </p>
        </div>
      </div>
    );
  }

  if (viewMode === "details" && selectedUser) {
    return (
      <div className="p-8">
        <UserDetailsView
          user={selectedUser}
          onBack={() => setViewMode("list")}
          onDelete={handleDeleteUser}
        />

        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={deleteConfig.onConfirm}
          title={deleteConfig.title}
          message={deleteConfig.message}
          count={deleteConfig.count}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-8">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userData.metrics.map((stat, idx) => (
          <UserStatCard
            key={idx}
            label={stat.label}
            value={stat.value}
            icon={iconMap[stat.icon]}
            color={stat.color}
          />
        ))}
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative">
        {/* Bulk Actions Overlay */}
        {selectedUsers.length > 0 && (
          <div className="absolute top-0 left-0 right-0 bg-[#129FED] px-8 py-4 z-10 flex items-center justify-between text-white animate-in slide-in-from-top duration-300">
            <div className="flex items-center gap-6">
              <span className="text-sm font-black uppercase tracking-widest">
                {selectedUsers.length} User Selected
              </span>
              <div className="h-4 w-px bg-white/20" />
              <button className="text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all border border-white/20">
                Suspend Accounts
              </button>
              <button className="text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all border border-white/20">
                Change Role
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-all shadow-lg"
              >
                <Trash2 size={14} /> Delete Selection
              </button>
              <button
                onClick={() => setSelectedUsers([])}
                className="text-[11px] font-bold uppercase tracking-widest text-white/70 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Table Header Filter Bar */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50/30">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search staff by name or email..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-[#129FED]/30 focus:ring-4 focus:ring-[#129FED]/5 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative group hidden sm:block">
              <Filter
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                size={18}
              />
              <select
                className="pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 outline-none hover:bg-slate-50 transition-all appearance-none cursor-pointer"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option>All Roles</option>
                <option>Admin</option>
                <option>Staff</option>
                <option>Billing</option>
                <option>Provider</option>
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
                size={14}
              />
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full md:w-auto bg-[#129FED] text-white px-8 py-3.5 rounded-xl text-sm font-black shadow-xl shadow-blue-100 hover:bg-[#129FED]/90 transition-all flex items-center justify-center gap-3 uppercase tracking-widest font-mono"
          >
            <Plus size={20} />
            Add New User
          </button>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-left w-10">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded-lg border-2 border-slate-200 text-[#129FED] focus:ring-[#129FED] transition-all cursor-pointer"
                    checked={
                      selectedUsers.length === filteredUsers.length &&
                      filteredUsers.length > 0
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-4 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  User Details
                </th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  Role
                </th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  Last Login
                </th>
                <th className="px-8 py-5 text-right text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-[#F8FAFC] group transition-all cursor-pointer ${selectedUsers.includes(user.id) ? "bg-[#E3F2FD]/40" : ""}`}
                  onClick={() => {
                    setSelectedUser(user);
                    setIsEditModalOpen(true);
                  }}
                >
                  <td
                    className="px-8 py-5"
                    onClick={(e) => toggleSelectUser(e, user.id)}
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded-lg border-2 border-slate-200 text-[#129FED] focus:ring-[#129FED] transition-all cursor-pointer"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => {}} // Controlled via row click
                    />
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#E3F2FD] group-hover:text-[#129FED] transition-all overflow-hidden border border-slate-200">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-black text-slate-800 tracking-tight leading-none">
                          {user.name}
                        </span>
                        <span className="text-[12px] font-medium text-slate-400 mt-1.5">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <ShieldCheck
                        size={14}
                        className={
                          user.role === "Admin"
                            ? "text-red-500"
                            : "text-[#129FED]"
                        }
                      />
                      <span className="text-[12px] font-bold text-slate-700 uppercase tracking-widest">
                        {user.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span
                      className={`text-[10px] font-black px-3 py-1.5 rounded-full border uppercase tracking-wider ${
                        user.status === "Active"
                          ? "bg-[#E9F7EF] text-[#27AE60] border-[#27AE60]/20"
                          : "bg-amber-50 text-amber-600 border-amber-200/50"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[12px] font-bold text-slate-500 italic tracking-tighter">
                      {user.lastLogin || "02/14/2025"}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUser(user);
                          setViewMode("details");
                        }}
                        className="p-2.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUser(user);
                          setIsEditModalOpen(true);
                        }}
                        className="p-2.5 text-slate-400 hover:text-[#129FED] hover:bg-[#E3F2FD] rounded-lg transition-all"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteUser(user);
                        }}
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!filteredUsers.length && (
            <div className="p-20 text-center">
              <Users className="w-16 h-16 text-slate-100 mx-auto mb-4" />
              <p className="text-slate-400 font-bold uppercase tracking-widest">
                No staff members found matching your search.
              </p>
            </div>
          )}
        </div>

        {/* Table Footer / Pagination */}
        <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/20 flex items-center justify-between">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
            Showing {filteredUsers.length} Users
          </span>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 transition-all font-mono">
              1
            </button>
            <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 transition-all font-mono">
              2
            </button>
          </div>
        </div>
      </div>

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddUser}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={selectedUser}
        onSave={handleUpdateUser}
        onDelete={handleDeleteUser}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={deleteConfig.onConfirm}
        title={deleteConfig.title}
        message={deleteConfig.message}
        count={deleteConfig.count}
      />
    </div>
  );
};

export default UserManagement;
