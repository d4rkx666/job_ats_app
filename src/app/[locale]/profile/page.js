"use client"

import React, { useState, useRef } from "react";
import ProfileForm from "./components/ProfileForm";
import { save_profile, save_personal_information, save_skills } from "@/app/hooks/SetProfile"
import { useAuth } from "@/app/contexts/AuthContext";
import { KeywordList } from "@/app/components/common/KeywordList";
import {XMarkIcon} from '@heroicons/react/24/outline';
import { useTranslations } from "use-intl";
import RequireAuth from "@/utils/RequireAuth";


function CreateResume() {

  // Language
  const t = useTranslations("keywordList");

  // Auth to autofill
  const { user, logout } = useAuth();
  const isPro = user?.subscription?.plan === 'pro' || user?.subscription?.plan === 'business';

  // For modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    console.log(!isModalOpen)
    setIsModalOpen(!isModalOpen);
  };

  // Get last keyword extraction from draft
  const lastKeywordExtraction = () => {
    const lastKw = user.creations?.filter(creation => creation.status === "draft");
    if(lastKw && lastKw.length > 0){
      return lastKw[lastKw.length - 1].keywords;
    }else{
      return []
    }
  };


  const [isLoading, setIsLoading] = useState(false);
  const [isSavedForms, setIsSavedForms] = useState(false);

  // Handler for form submission (manual save)
  const handleSubmit = async (data) => {
    setIsLoading(true);

    try {
      await save_profile({ educations: data.educations, jobs: data.jobs, projects: data.projects }).then(response => {
        if (response.success) {
          setIsSavedForms(true);
          setTimeout(() => setIsSavedForms(false), 2000);
        }
      }).catch(error => {
        if(error.response?.data?.detail === "403: Email not verified"){
        }else if (error.status === 500) {// token expired
          logout();
        }
      })
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-save function for personal information
  const autoSavePersonalInformation = async (data) => {
    setIsLoading(true);
    let isSaved = false;

    try {
      isSaved = await save_personal_information(data).then(response => {
        if (response.success) {
          return true;
        } else {
          return false;
        }
      }).catch(error => {
        if(error.response?.data?.detail === "403: Email not verified"){
        }else if (error.status === 500) {// token expired
          logout();
        }
      })
    } catch (error) {
    } finally {
      setIsLoading(false);
      return isSaved
    }
  };

  // Auto-save function for personal information
  const autoSaveSkills = async (data) => {
    setIsLoading(true);
    let isSaved = false;

    try {
      isSaved = await save_skills({ skills: data }).then(response => {
        if (response.success) {
          return true;
        } else {
          return false;
        }
      }).catch(error => {
        if(error.response?.data?.detail === "403: Email not verified"){
        }else if (error.status === 500) {// token expired
          logout();
        }
      })
    } catch (error) {
    } finally {
      setIsLoading(false);
      return isSaved;
    }
  };


  const DraggableKeywordModal = ({ keywords, toggleModal }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const modalRef = useRef(null);
    const headerRef = useRef(null);
  
    // Handle drag start (when user clicks on the modal header)
    const handleMouseDown = (e) => {
      if (e.target.closest('button')) return; // Ignore clicks on buttons
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };
  
    // Handle dragging movement
    const handleMouseMove = (e) => {
      const maxX = window.innerWidth - modalRef.current.offsetWidth;
      const maxY = window.innerHeight - modalRef.current.offsetHeight;
      setPosition({
        x: Math.min(Math.max(0, e.clientX - modalRef.current.offsetWidth / 2), maxX),
        y: Math.min(Math.max(0, e.clientY - 20), maxY),
      });
    };
  
    // Clean up drag events
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  
    return (
      <div className="fixed inset-0 bg-black/50 z-50 p-4">
        {/* Draggable Modal */}
        <div
          ref={modalRef}
          className="bg-gray-100 border-4 border-indigo-500 rounded-lg max-w-lg w-full max-h-[80vh] flex flex-col shadow-xl"
          style={{
            position: 'absolute',
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: 'translate(0, 0)', // Reset default centering
          }}
        >
          {/* Draggable Header Area */}
          <div 
            ref={headerRef}
            className="p-2 cursor-move hover:bg-gray-200 transition-colors"
            onMouseDown={handleMouseDown}
          >
            <div className="flex justify-end">
              <button
                onClick={toggleModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
  
          {/* Scrollable content (unchanged) */}
          <div className="p-6 overflow-y-auto flex-grow">
            <KeywordList 
              isPro={isPro} 
              keywords={keywords}
              profile 
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Floating Action Button */}
      { (lastKeywordExtraction().length > 0) && (
      <div className="fixed bottom-6 right-6 z-50 group">
        <button
          onClick={toggleModal}
          className="hidden relative md:flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="View extracted keywords"
        >
          {/* Main Icon (Lightbulb for "suggestions") */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>

          {/* Badge showing keyword count (only if keywords exist) */}
          {lastKeywordExtraction().length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {lastKeywordExtraction().length}
            </span>
          )}
        </button>

        {/* Tooltip on hover */}
        <div className="absolute right-16 bottom-2 bg-gray-800/0 text-white text-sm px-3 py-1 rounded group-hover:bg-gray-800/100 transition-opacity whitespace-nowrap">
          {t("lastExtracted")}
        </div>
      </div>
      )}

      {/* Modal - using the passed modal component */}
      {isModalOpen && <DraggableKeywordModal keywords={lastKeywordExtraction()} toggleModal={toggleModal}/>
      }


      <ProfileForm
        onSubmit={handleSubmit}
        autoSavePersonalInformation={autoSavePersonalInformation}
        autoSaveSkills={autoSaveSkills}
        userData={user}
        isLoading={isLoading}
        isSavedForms={isSavedForms}
      />

    </>
  );
}

export default RequireAuth(CreateResume);