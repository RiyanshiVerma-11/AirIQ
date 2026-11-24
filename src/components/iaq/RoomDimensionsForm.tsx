import React from 'react'

interface RoomDimensionsFormProps {
  lengthM: number
  widthM: number
  heightM: number
  volumeM3: number
  onDimensionsChange: (l: number, w: number, h: number) => void
}

export const RoomDimensionsForm: React.FC<RoomDimensionsFormProps> = ({
  lengthM,
  widthM,
  heightM,
  volumeM3,
  onDimensionsChange,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-xs font-semibold text-slate-300">
          Room Dimensions (Meters):
        </label>
        <span className="text-xs text-slate-400">
          Volume: <strong className="text-white">{volumeM3} m³</strong> ({Math.round(volumeM3 * 35.315)} ft³)
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
            <span>Length</span>
            <span className="text-white font-bold">{lengthM} m</span>
          </div>
          <input
            type="range"
            min="2.5"
            max="10"
            step="0.5"
            value={lengthM}
            onChange={(e) => onDimensionsChange(parseFloat(e.target.value) || 4, widthM, heightM)}
            className="w-full accent-cyan-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
            <span>Width</span>
            <span className="text-white font-bold">{widthM} m</span>
          </div>
          <input
            type="range"
            min="2.5"
            max="10"
            step="0.5"
            value={widthM}
            onChange={(e) => onDimensionsChange(lengthM, parseFloat(e.target.value) || 4, heightM)}
            className="w-full accent-cyan-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
            <span>Height</span>
            <span className="text-white font-bold">{heightM} m</span>
          </div>
          <input
            type="range"
            min="2.2"
            max="4.5"
            step="0.1"
            value={heightM}
            onChange={(e) => onDimensionsChange(lengthM, widthM, parseFloat(e.target.value) || 2.8)}
            className="w-full accent-cyan-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}
